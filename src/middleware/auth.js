export function loadSessionUser(req, res, next) {
    const user = req.session?.user || null;
    req.user = user;
    res.locals.user = user;
    return next();
}

export function requirePageLogin(req, res, next) {
    if (!req.session.user) {
        return res.redirect('/login');
    }
    return next();
}

export function requireApiLogin(req, res, next) {
    if (!req.session.user) {
        return res.status(401).json({ message: 'Authentication required' });
    }
    return next();
}

export function requirePageRole(role) {
    return function (req, res, next) {
        if (!req.session.user) {
            return res.redirect('/login');
        }
        if (req.session.user.role !== role) {
            return res.status(403).render('errors/403', { title: 'Forbidden' });
        }
        return next();
    };
}

export function requireApiRole(role) {
    return function (req, res, next) {
        if (!req.session.user) {
            return res.status(401).json({ message: 'Authentication required' });
        }
        if (req.session.user.role !== role) {
            return res.status(403).json({ message: 'Forbidden' });
        }
        return next();
    };
}