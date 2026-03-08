import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { getPluggedInRanking, getUnpluggedRanking } from "../api/rankingApi";
import { retrieveDataFromCms } from "../api/rankingApi";
import { getOlympiads } from "../api/rankingApi";
import { getItineraries } from "../api/rankingApi";
import { checkExercises } from "../api/rankingApi";
import translateCategory from "../utils/categories";

export default function Ranking() {

    const [data, setData] = useState([]);
    const [teams, setTeams] = useState([]);
    const [exercises, setExercises] = useState([]);
    const [loading, setLoading] = useState(false);

    const [loadingOlympiads, setLoadingOlympiads] = useState(false);
    const [loadingItineraries, setLoadingItineraries] = useState(false);
    const [loadingExercises, setLoadingExercises] = useState(false);

    const [olympiads, setOlympiads] = useState([]);
    const [itineraries, setItineraries] = useState([]);

    const [selectedOlympiad, setSelectedOlympiad] = useState("");
    const [selectedItinerary, setSelectedItinerary] = useState("");
    const [selectedExType, setSelectedExType] = useState("");

    const [exerciseTypes, setExerciseTypes] = useState({
        unplugged: false,
        pluggedIn: false
    });

    const [sortColumn, setSortColumn] = useState("total");
    const [sortAsc, setSortAsc] = useState(false);

    useEffect(() => {
        loadOlympiads();
    }, []);

    const loadOlympiads = async () => {
        setLoadingOlympiads(true);
        try {
            const res = await getOlympiads();
            setOlympiads(res.data);
        } catch (err) {
            console.log(err);
        } finally {
            setLoadingOlympiads(false);
        }
    };

    useEffect(() => {

        if (!selectedOlympiad) {
            setItineraries([]);
            setSelectedItinerary("");
            return;
        }

        const loadItineraries = async () => {
            setLoadingItineraries(true);
            console.log(selectedOlympiad)
            try {
                const res = await getItineraries(selectedOlympiad);
                setItineraries(res.data);
                setSelectedItinerary("");
            } catch (err) {
                console.log(err);
            } finally {
                setLoadingItineraries(false);
            }
        };

        loadItineraries();

    }, [selectedOlympiad]);

    useEffect(() => {

        if (!selectedItinerary) return;

        const loadExerciseTypes = async (itineraryId) => {
            setLoadingExercises(true);
            try {
                const res = await checkExercises(itineraryId);
                console.log(res.data)
                setExerciseTypes(res.data);

                setSelectedExType("");
            } catch (err) {
                console.log(err);
            } finally {
                setLoadingExercises(false);
            }
        };

        loadExerciseTypes(selectedItinerary);

    }, [selectedItinerary]);

    const loadRanking = async (itineraryId, showLoading = true) => {

        if (showLoading) setLoading(true);

        try {

            let res;

            if (selectedExType === "unplugged") {
                res = await getUnpluggedRanking(itineraryId);
            } else if (selectedExType === "pluggedIn") {
                await retrieveDataFromCms(itineraryId);
                res = await getPluggedInRanking(itineraryId);
            }

            setData(res.data);
            processRanking(res.data);

        } catch (err) {
            console.log(err);
        } finally {
            if (showLoading) setLoading(false);
        }
    };

    useEffect (() => {
        if (!selectedExType) return;

        loadRanking(selectedItinerary);
    }, [selectedExType]);

    useEffect(() => {

        if (!selectedItinerary || !selectedExType) return;

        const interval = setInterval(() => {
            loadRanking(selectedItinerary, false);
        }, 10000); // 10 segundos

        return () => clearInterval(interval);

    }, [selectedItinerary, selectedExType]);

    const processRanking = (rows) => {

        const exerciseSet = new Set();
        const teamsMap = {};

        rows.forEach(r => {

            //const exLabel = `${r.ex_name}(${translateCategory(r.ex_category)})`;

            exerciseSet.add(r.ex_name);

            if (!teamsMap[r.team_name]) {
                teamsMap[r.team_name] = {
                    team: r.team_name,
                    scores: {},
                    total: 0
                };
            }

            teamsMap[r.team_name].scores[r.ex_name] = Number(r.score);
            teamsMap[r.team_name].total += Number(r.score);
        });

        const exercisesArray = Array.from(exerciseSet).sort();

        const teamsArray = Object.values(teamsMap)
            .sort((a, b) => b.total - a.total);

        setExercises(exercisesArray);
        setTeams(teamsArray);
    };

    const sortedTeams = [...teams].sort((a, b) => {
        if (sortColumn === "total") {
            return sortAsc ? a.total - b.total : b.total - a.total;
        } else {
            const scoreA = a.scores[sortColumn] ?? 0;
            const scoreB = b.scores[sortColumn] ?? 0;
            return sortAsc ? scoreA - scoreB : scoreB - scoreA;
        }
    });

    const handleSort = (column) => {
        if (sortColumn === column) {
            setSortAsc(!sortAsc);
        } else {
            setSortColumn(column);
            setSortAsc(false);
        }
    };

    return (
        <Container>
            <div className="ranking-controller element-container">
                <div>
                    <label className="form-label">Olimpiada</label>
                    <select
                    className="form-control"
                        value={selectedOlympiad}
                        onChange={(e) => setSelectedOlympiad(e.target.value)}
                        disabled={loadingOlympiads || !olympiads.length}
                    >

                    <option value="">{
                        loadingOlympiads ?
                        "-- Cargando olimpiadas --" :
                        !olympiads.length ?
                        "-- No hay olimpiadas disponibles --"
                        : "-- Selecciona una olimpiada --"
                    }</option>

                    {olympiads.map(o => (
                        <option key={o.id} value={o.id}>
                            {o.name}
                        </option>
                    ))}

                    </select>
                </div>

                <div>
                    <label className="form-label">Itinerario</label>
                    <select
                    className="form-control"
                        value={selectedItinerary}
                        onChange={(e) => setSelectedItinerary(e.target.value)}
                        disabled={!selectedOlympiad || !itineraries.length || loadingItineraries}
                    >

                    <option value="">{
                        loadingItineraries ?
                        "-- Cargando itinerarios --" :
                        !selectedOlympiad
                        ? "-- Selecciona primero una olimpiada --"
                        : itineraries.length === 0
                        ? "-- No hay itinerarios disponibles --"
                        : "-- Selecciona un itinerario --"
                    }</option>

                    {itineraries.map(i => (
                        <option key={i.id} value={i.id}>
                            {i.name}
                        </option>
                    ))}

                    </select>
                </div>

                <div>
                    <label className="form-label">Ejercicios</label>
                    <select
                    className="form-control"
                        value={selectedExType}
                        onChange={(e) => setSelectedExType(e.target.value)}
                        disabled={(!exerciseTypes.unplugged && !exerciseTypes.pluggedIn) || !itineraries.length || loadingExercises}
                    >
                        <option value="">
                            {
                                loadingExercises ?
                                "-- Cargando --" :
                                !selectedItinerary
                                ? "-- Selecciona primero un itinerario --"
                                : !itineraries.length ?
                                "-- No hay ejercicios disponibles --"
                                : (!exerciseTypes.unplugged && !exerciseTypes.pluggedIn) ?
                                "-- No hay ejercicios disponibles --"
                                : "-- Selecciona el tipo de ejercicio --"
                            }
                        </option>
                        {exerciseTypes.unplugged && (
                            <option value={"unplugged"}>
                                Ejercicios desenchufados
                            </option>
                        )}
                        {exerciseTypes.pluggedIn && (
                            <option value={"pluggedIn"}>
                                Ejercicios enchufados
                            </option>
                        )}
                    </select>
                </div>
            </div>
            <div className="table-wrap">
                <table className="table table-hover table-bordered">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Equipo</th>

                            {exercises.map(exName => {
                                const exCategory = data.find(r => r.ex_name === exName)?.ex_category ?? "";
                                return (
                                    <th
                                        key={exName}
                                        style={{ cursor: "pointer" }}
                                        onClick={() => handleSort(exName)}
                                    >
                                        <div className="icon-header-cell">
                                            <div>
                                                {exName}
                                                <br />
                                                <span className="optional">{translateCategory(exCategory)}</span>
                                            </div>
                                            <div className="header-icon">
                                                {sortColumn === exName ? (sortAsc ?
                                                <i class="fa-solid fa-sort-up"></i> :
                                                <i class="fa-solid fa-sort-down"></i>) : ""}
                                            </div>
                                        </div>
                                    </th>
                                );
                            })}

                            <th
                                style={{ cursor: "pointer" }}
                                onClick={() => handleSort("total")}
                            >
                                <div className="icon-header-cell">
                                    <span>Total</span>
                                    <div className="header-icon">
                                        {sortColumn === "total" ? (sortAsc ?
                                        <i class="fa-solid fa-sort-up"></i> :
                                        <i class="fa-solid fa-sort-down"></i>) : ""}
                                    </div>
                                </div>
                            </th>
                        </tr>
                    </thead>

                    <tbody>

                        {loading
                        ? Array.from({ length: 5 }).map((_, i) => (
                            <tr key={i} className="skeleton-row">
                                <td colSpan={exercises.length + 3}>
                                    <div className="skeleton-cell"></div>
                                </td>
                            </tr>
                        ))

                        : sortedTeams.map((team, index) => (
                            <tr key={team.team}>

                                <td>{index + 1}</td>

                                <td>{team.team}</td>

                                {exercises.map(exName => (
                                    <td key={exName}>
                                        {team.scores[exName] ?? 0}
                                    </td>
                                ))}

                                <td><b>{team.total}</b></td>

                            </tr>
                        ))}

                    </tbody>

                </table>
            </div>
        </Container>
    );
}
