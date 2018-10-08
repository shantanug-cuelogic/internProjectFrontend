import axios from 'axios';

class DashboardService {

    getRecentActivity = (userId) => {
        axios.get('/recentactivity/' + userId)
            .then((response) => {
              console.log(response.data);
                if (response.data.success) {
                    return response.data.result;
                }
                else { 
                    return null;
                }
            })
            .catch((error) => {
                console.log(error);
                return null;    
            })
    }

}

export default new DashboardService();

