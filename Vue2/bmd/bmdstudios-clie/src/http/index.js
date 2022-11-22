// 当前模块需要整合所有的API子模块,方便调用
import actorApi from '@/http/apis/ActorApi'
import movieApi from './apis/Movie'
import cinemaApi from './apis/CinemaApi'
import cinemaRoomApi from './apis/CinemaRoomApi'
import showingonPlanApi from './apis/ShowingonPlanApi'
import adminApi from './apis/AdminApi'

const httpApi = {
    actorApi,
    movieApi,
    cinemaApi,
    cinemaRoomApi,
    showingonPlanApi,
    adminApi,
}
export default httpApi
