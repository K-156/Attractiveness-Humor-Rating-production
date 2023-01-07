import moment from "moment/moment";

const getCurrentTime = () => {

    return moment(new Date()).format("DD/MM/YYYY HH:mm:ss");
}

export { getCurrentTime }