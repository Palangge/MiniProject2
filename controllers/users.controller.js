let usersModel = require ('../models/users.model');

function getAllUsers(req, res) {
    res.status(200).json(usersModel);
}

function changePassword(req, res) {
    const {email, password} = req.body;
    
    // constant variables to hold messages
    const USER_NOT_FOUND = 'User does not exist';
    const PASSWORD_IS_EMPTY = 'Password field cannot be empty';
    const PASSWORD_UPDATED_MSG = email => `User ${email}'s password has been updated`;

    const user = usersModel.find(user => user.email === email);

    if (user && password) {
        user.password = password;
        return res.send(PASSWORD_UPDATED_MSG(email));
    } else {
        return !password ? res.send(PASSWORD_IS_EMPTY) : res.send(USER_NOT_FOUND);
    }
}

function login(req, res) {
    const {email, password} = req.body;
    
    // constant variables to hold messages
    const PASSWORD_IS_EMPTY = 'Password field cannot be empty';
    const INVALID_CREDENTIALS = 'Invalid email/password';
    const LOGIN_AUTH = `User ${email} logged in successfully!`;

    const user = usersModel.find(user => user.email === email);

    if (user && password) {
        if(user.password === password){
            const session=req.session;
            session.email=email;
            session.firstName=user.firstName;
            session.lastName=user.lastName;
            store_set(session.id,session);
            console.log(session.id);
            return res.send(LOGIN_AUTH);
        }
        return res.status(400).send(INVALID_CREDENTIALS);
    } else {
        return !password ? res.status(400).send(PASSWORD_IS_EMPTY) : res.status(400).send(INVALID_CREDENTIALS);
    }
}

function logout(req, res) {
    store_destory(req.session.id);//server session
    req.session.destroy();//client cookie

    //res.redirect('/');
}

function addUser(req, res) {
    const {email, password, firstName, lastName} = req.body;

    if (!email || !password || !firstName || !lastName) {
        return res.status(400).json({
            error: `Pelase fill out the complete information.`
        });
    }

    const user = usersModel.find(user => user.email === email);

    if (user) {
        return res.status(400).json({
            error: `User already registered.`
        });
    }
    usersModel.push({email, password, firstName, lastName});
    res.send(`User ${email} successfully registered!`);
}

// Session Store / Cache
let session_store = [];

function store_set(sid,session){
    let ses = session_store.find(ses => ses.id === sid);
    if(ses){
        ses.session = session;
    }
    else
    {
        session_store.push({id: sid,session: session});
    }
}

function store_destory(sid){
session_store = session_store.filter(ses => ses.id !== sid)
}

function store_get(sid){
return session_store.find(ses => ses.id === sid);
}

function me(req, res) {
    const session = req.session;
    // console.log("session_store"+JSON.stringify(session_store));
    // console.log("session.id:"+session.id);
    const sess = store_get(session.id);
    // console.log(sess);
    if(sess && sess.session.email && sess.session.email!="")
        return res.send(sess.session.email);
    else
        return res.status(400).send(session.id);
}



module.exports = {
    getAllUsers,
    changePassword,
    addUser,
    login,
    logout,
    me,
    session_store,
    store_set,
    store_get
};