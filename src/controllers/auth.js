import { findUserByEmail, findUserByUsername, verifyPassword , createUser} from '../models/users.js';

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


export async function registerPage(req, res) {
    return res.render('register', { title: 'Register' });
}

export async function loginPage(req, res) {
    return res.render('login', { title: 'Login' });
}

export async function registerUser(req, res) {
    const { displayName, username, email, password, confirmPassword } = req.body;

    if (!displayName?.trim() || !username?.trim() || !email?.trim() || !password) {
        return res.status(400).render('register', { title: 'Register', error: 'All fields are required.' });
    }
    if (!emailPattern.test(email.trim())) {
        return res.status(400).render('register', { title: 'Register', error: 'Please enter a valid email.' });
    }
    if (password.length < 8) {
        return res.status(400).render('register', { title: 'Register', error: 'Password must be at least 8 characters long.' });
    }
    if (password !== confirmPassword) {
        return res.status(400).render('register', { title: 'Register', error: 'Passwords do not match.' });
    }

    try {
        await createUser({
            displayName: displayName.trim(),
            username,
            email,
            password,
        });

        return res.redirect('/login?registered=1');
    } catch (error) {
        if (error.code === 11000) {
            return res.status(409).render('register', { title: 'Register', error: 'Email or username is already in use.' });
        }
        console.error('Error registering user:', error);
        return res.status(500).render('register', { title: 'Register', error: 'Something went wrong. Please try again.' });
    }
}

export async function loginUser(req, res) {
    const { email, password } = req.body;

    if (!email?.trim() || !password) {
        return res.status(400).render('login', { title: 'Login', error: 'Email and password are required.', message: null });
    }

    try {
        const user = await findUserByEmail(email);
        const passwordIsValid = user ? await verifyPassword(password, user.passwordHash) : false;

        if (!passwordIsValid) {
            return res.status(401).render('login', { title: 'Login', error: 'Invalid email or password.', message: null });
        }

        return req.session.regenerate((error) => {
            if (error) {
                console.error('Error regenerating session:', error);
                return res.status(500).render('login', { title: 'Login', error: 'Something went wrong. Please try again.', message: null });
            }

            req.session.user = {
                id: user._id.toString(),
                displayName: user.displayName,
                username: user.username,
                role: user.role.name,
            };

            return res.redirect('/');
        });
    } catch (error) {
        console.error('Error logging in:', error);
        return res.status(500).render('login', { title: 'Login', error: 'Something went wrong. Please try again.', message: null });
    }
}

export async function logoutUser(req, res) {
    req.session.destroy((error) => {
        if (error) {
            console.error('Error logging out:', error);
            return res.status(500).render('500', { title: 'Server Error' });
        }
        res.clearCookie('connect.sid');
        return res.redirect('/');
    });
}