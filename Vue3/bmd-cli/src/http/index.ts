// 当前模块整合所有的API子模块，方便调用
import actorApi from './apis/ActorApi'
import directorApi from './apis/DirectorApi'
import movieApi from './apis/MovieApi'
import cinemaApi from './apis/CinemaApi'
import cinemaRoomApi from './apis/CinemaRoomApi'
import showingonPlanApi from './apis/ShowingonPlanApi'
import adminApi from './apis/AdminApi'

const httpApi = {
    actorApi,
    directorApi,
    movieApi,
    cinemaApi,
    cinemaRoomApi,
    showingonPlanApi,
    adminApi
};

export default httpApi;
