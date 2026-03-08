import { Container } from "react-bootstrap";
import PageHeader from "../components/layouts/PageHeader";
import Ranking from "../components/Ranking";

export default function RankingPage() {
    //const [refreshKey, setRefreshKey] = useState(0);

    return (
        <Container>
            <PageHeader
                title = "Ranking"
                backButtonRoute="/"
            />
            <Ranking /**refreshKey={refreshKey} */ />
        </Container>

    );
}
