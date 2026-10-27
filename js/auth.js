// Authentication & Access Control Controller for Scheme Spot
const Auth = {
  // Hardcoded Super Admin Credentials
  ADMIN_CONFIG: {
    username: "admin",
    password: "GovtPortal#2026@SecuredX!"
  },

  // Get active session from browser storage
  getCurrentSession() {
    return JSON.parse(localStorage.getItem('ss_active_session') || 'null');
  },

  // Set active session
  setSession(sessionData) {
    localStorage.setItem('ss_active_session', JSON.stringify(sessionData));
  },

  // Clear session on logout
  logout() {
    const session = this.getCurrentSession();
    if (session) {
      DB.logLoginEvent(session.name || session.username, session.role, "Logged Out");
    }
    localStorage.removeItem('ss_active_session');
  },

  // Handle Admin Sign In
  loginAdmin(username, password) {
    if (username.trim() === this.ADMIN_CONFIG.username && password === this.ADMIN_CONFIG.password) {
      const session = {
        role: "admin",
        username: "admin",
        name: "Portal Administrator",
        loginTime: new Date().toISOString()
      };
      this.setSession(session);
      DB.logLoginEvent("admin", "Admin", "Success");
      return { success: true, session };
    } else {
      DB.logLoginEvent(username || "unknown_admin", "Admin", "Failed Attempt");
      return { success: false, message: "Invalid Admin credentials. Access denied." };
    }
  },

  // Handle Citizen Sign In
  loginCitizen(email, password) {
    const users = DB.getUsers();
    const user = users.find(u => u.email.toLowerCase() === email.trim().toLowerCase() && u.password === password);

    if (user) {
      const session = {
        role: "citizen",
        id: user.id,
        name: user.name,
        email: user.email,
        state: user.state,
        savedSchemes: user.savedSchemes || [],
        loginTime: new Date().toISOString()
      };
      this.setSession(session);
      DB.logLoginEvent(user.email, "Citizen", "Success");
      return { success: true, session };
    } else {
      DB.logLoginEvent(email || "unknown_citizen", "Citizen", "Failed Attempt");
      return { success: false, message: "Invalid email or password. Please verify your credentials." };
    }
  },

  // Handle Citizen Registration
  registerCitizen(name, email, state, password) {
    const users = DB.getUsers();
    const cleanEmail = email.trim().toLowerCase();

    if (users.find(u => u.email.toLowerCase() === cleanEmail)) {
      return { success: false, message: "A citizen account with this email address already exists." };
    }

    const newUser = {
      id: "usr_" + Date.now(),
      name: name.trim(),
      email: cleanEmail,
      state: state,
      password: password,
      savedSchemes: [],
      registeredOn: new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })
    };

    DB.addUser(newUser);

    // Auto-login citizen after successful registration
    const session = {
      role: "citizen",
      id: newUser.id,
      name: newUser.name,
      email: newUser.email,
      state: newUser.state,
      savedSchemes: [],
      loginTime: new Date().toISOString()
    };
    this.setSession(session);
    DB.logLoginEvent(newUser.email, "Citizen", "Registered & Logged In");

    return { success: true, session };
  },

  // Toggle saved schemes bookmarks for Citizen
  toggleBookmark(schemeId) {
    const session = this.getCurrentSession();
    if (!session || session.role !== 'citizen') return false;

    session.savedSchemes = session.savedSchemes || [];
    const index = session.savedSchemes.indexOf(schemeId);

    if (index > -1) {
      session.savedSchemes.splice(index, 1);
    } else {
      session.savedSchemes.push(schemeId);
    }

    // Update active session & DB
    this.setSession(session);

    const user = DB.getUsers().find(u => u.id === session.id);
    if (user) {
      user.savedSchemes = session.savedSchemes;
      DB.updateUser(user);
    }

    return true;
  }
};