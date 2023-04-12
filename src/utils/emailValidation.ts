export const emailValidation = (email: string)=>{
     if(!email){
        return { ok: false, message: "Pole adres email nie może być puste"}
    } else {
        return /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email) ? { ok: true, message: '' } : { ok: false, message: 'Niepoprawny format wprowadzonego maila'};
    }
    
}