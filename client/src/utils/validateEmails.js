
// from emaailregex.com
const re =/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export default (emails) =>{

    // if email fails re, then it returns false in filter function returns true.
    // if expression return true, it will be kept in final array.

    

    const invalidEmails = emails
        .split(',')
        .map((email)=>email.trim())
        .filter((email)=> re.test(email)===false )  
    

    if(invalidEmails.length){
        return `These emails are invalid: ${invalidEmails}`
    }

    return

}