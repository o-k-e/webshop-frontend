import axios from "axios";

const fileUploaderClient = axios.create({
    baseURL: import.meta.env.VITE_FILE_API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

export default fileUploaderClient;