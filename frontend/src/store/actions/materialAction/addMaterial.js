import axios from "axios/index";
import {
    UPLOAD_PROGRESS,
    NONE_ADD_MATERIAL,
} from '../ActionType';

function uploadVedeo(dataHttp, token, dispatch) {
    let progress = [];

    axios.post(process.env.REACT_APP_API_URL + "/materials/upload/videos", dataHttp, {
        headers: {
            "Authorization": `Bearer ` + token
        }, onUploadProgress: progressEvent => {
            progress.push(parseInt(
                Math.round((progressEvent.loaded * 100) / progressEvent.total)
                , 10))
            if (parseInt(
                Math.round((progressEvent.loaded * 100) / progressEvent.total)
                , 10) === 100) {
                if ((progress.length === 1 && progress[0] === 100) || (progress.length === 2 && progress[1] === 100)) {
                    dispatch({
                        type: UPLOAD_PROGRESS,
                        payload: 99
                    })
                    setTimeout(() => {
                        dispatch({
                            type: UPLOAD_PROGRESS,
                            payload: 0
                        })
                    }, 10)
                } else {
                    dispatch({
                        type: UPLOAD_PROGRESS,
                        payload: 0
                    })
                }
            } else {
                dispatch({
                    type: UPLOAD_PROGRESS,
                    payload: parseInt(
                        Math.round((progressEvent.loaded * 100) / progressEvent.total)
                        , 10)
                })
            }
        },
    })
        .then(results => {
        })
        .catch(err => {
            dispatch({
                type: NONE_ADD_MATERIAL,
                payload: false,
            })
        });
}

export function addMaterial(data) {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");

    return async function (dispatch) {
        const dataHttp = new FormData()
        let i = 0;

        dataHttp.append('title', data.title);
        dataHttp.append('description', data.description);
        dataHttp.append('category', data.category);
        dataHttp.append('userId', userId);
        dataHttp.append('videos', data.videos);
        dataHttp.append('familyName', data.userData.familyName);
        dataHttp.append('givenName', data.userData.givenName);

        if (data.videos.length > 0)
            for (let i = 0; i < data.videos.length; i++) {
                dataHttp.append('comments' + i, data.videos[i].comments);
                dataHttp.append('dislikes' + i, data.videos[i].dislikes);
                dataHttp.append('likes' + i, data.videos[i].likes);
                dataHttp.append('videoLink' + i, data.videos[i].videoLink);
                dataHttp.append('videoTitle' + i, data.videos[i].videoTitle);
                dataHttp.append('views' + i, data.videos[i].views);
                dataHttp.append('views' + i, data.videos[i].views);
                if (data.videos[i].newFile !== undefined)
                    dataHttp.append('newFile' + i, data.videos[i].newFile.name);
            }

        if (data.photo !== "")
            await dataHttp.append('file', data.photo, data.photo.name)

        while (i < data.videos.length) {
            if (data.videos[i].newFile !== undefined)
                await dataHttp.append('file', data.videos[i].newFile)
            i++;
        }

        await uploadVedeo(dataHttp, token, dispatch);
    }

};