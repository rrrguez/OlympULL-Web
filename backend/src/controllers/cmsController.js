import fs from 'fs';
import { buildCmsData } from '../services/cms/buildCmsData.js';
import { deployToCms } from '../services/cms/deployToCms.js';

export async function deployOlympiadToCms(req, res) {
    try {
        const { olympiadId } = req.params;
        const { commandVariant } = req.params;

        if (!olympiadId) {
            return res.status(400).json({ error: 'No se ha proporcionado un ID de olimpiada' });
        }

        const cmsData = await buildCmsData(olympiadId);

        const sshConfig = {
            host: "10.6.131.206",
            port: 22,
            username: "usuario",
            privateKey: fs.readFileSync('/app/keys/cms_backend_key')
        };

        const remoteDir = '/tmp/cms-contests';

        await deployToCms(cmsData, sshConfig, remoteDir, commandVariant);

        res.status(200).json({ message: 'Contest deployed successfully to CMS' });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'CMS deployment failed', details: error.message });
    }
}
