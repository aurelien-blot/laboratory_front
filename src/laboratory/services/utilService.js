export default class UtilService {
    static isEmail(email) {
        return Boolean(String(email)
            .toLowerCase()
            .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            ));
    }

    static isEmailList(emailList) {
        let splitedCharList = [';', ',']
        let splitedChar = null;
        for (let i = 0; i < splitedCharList.length; i++) {
            if (emailList.includes(splitedCharList[i])) {
                splitedChar = splitedCharList[i];
                break;
            }
        }

        let result;
        if (splitedChar!=null) {
            let emailListSplited = emailList.split(splitedChar).filter(email => email.length > 0);
            result= emailListSplited.every(email => UtilService.isEmail(email));
        }
        else{
            result = UtilService.isEmail(emailList);
        }
        return result;
    }
}