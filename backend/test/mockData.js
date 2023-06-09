const casual = require('casual')

const VAL_TEST = 5

casual.define('utente', () => {
    return {
        nome: casual.username,
        email: casual.email,
        password: casual.password
    }
})


casual.define('campo', () => {
    return {
        nome: casual.name,
        descrizione: casual.description,
        dataInizio: casual.date((format = 'YYYY-MM-DD')),
        posti: casual.integer(from = 0, to = 100) 
    }
})
 /**
     * @param nome
     * @param email
     * @param password
     */
const state = {
    users: casual.utente,
}

/**
 * Solo per retrocompatibilità con i test.
 * @deprecated
 */
const users = []
const main = () => {
    for(let i=0; i<VAL_TEST; ++i){
        users.push(casual.user)
    }
}

module.exports= {
    main,
    users,
    VAL_TEST,
    state
}