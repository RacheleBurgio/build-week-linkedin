const items = [
    {
        role: 'Master in Computer Science',
        company: 'Università La Sapienza #education#',
        startDate: '2010-01-01',
        endDate: '2012-01-01',
        description: 'Specializzazione in sistemi informativi aziendali.',
        area: 'Roma, Italia',
    },
    {
        role: 'Bachelor in Information Technology',
        company: 'Politecnico di Milano #education#',
        startDate: '2006-01-01',
        endDate: '2010-01-01',
        description: 'Corso triennale in ingegneria informatica.',
        area: 'Milano, Italia',
    },
    {
        role: 'High School Diploma',
        company: 'Liceo Scientifico Galileo Galilei #education#',
        startDate: '2001-01-01',
        endDate: '2006-01-01',
        description: 'Diploma scientifico con orientamento informatico.',
        area: 'Napoli, Italia',
    },
    {
        role: 'Corso Full Stack Developer',
        company: 'Udemy #courses#',
        startDate: '2022-09-01',
        endDate: '2022-12-01',
        description: 'Introduzione a backend e frontend development.',
        area: 'Online',
    },
    {
        role: 'Certificazione Cybersecurity',
        company: 'Cisco Networking Academy #courses#',
        startDate: '2021-01-01',
        endDate: null,
        description: 'Fondamenti di cybersecurity e protezione dei dati.',
        area: 'Online',
    },
];
const url =
    'https://striveschool-api.herokuapp.com/api/profile/675fedea0ea286001528b93d/experiences';

const token =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NzVmZWRlYTBlYTI4NjAwMTUyOGI5M2QiLCJpYXQiOjE3MzQzNDAwNzQsImV4cCI6MTczNTU0OTY3NH0.BEnpLihwvPcdOJFchUaXuyTy98g4C5Ek2mQCIp70_yM';

document
    .getElementById('send-data')
    .addEventListener('click', async function () {
        const statusDiv = document.getElementById('status');
        statusDiv.innerHTML = 'Invio in corso...';

        try {
            for (const item of items) {
                setTimeout(async () => {
                    const response = await fetch(url, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            Authorization: `Bearer ${token}`,
                        },
                        body: JSON.stringify(item),
                    });

                    if (!response.ok) {
                        throw new Error(`Errore nel caricamento di ${item.role}`);
                    }

                    const result = await response.json();
                    console.log(`Successo: ${result.role}`);
                }, 1000);
            }

            statusDiv.innerHTML = '<span id="success">Dati inviati con successo!</span>';
        } catch (error) {
            statusDiv.innerHTML = `<span id="error">Errore: ${error.message}</span>`;
        }
    });
