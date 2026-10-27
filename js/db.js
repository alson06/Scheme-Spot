// Central Database Simulation Engine for Scheme Spot
const DB = {
  init() {
    if (!localStorage.getItem('ss_visitors_count')) {
      localStorage.setItem('ss_visitors_count', '142');
    }
    if (!localStorage.getItem('ss_custom_schemes')) {
      localStorage.setItem('ss_custom_schemes', JSON.stringify([]));
    }
    if (!localStorage.getItem('ss_feedbacks')) {
      const sampleFeedbacks = [
        {
          id: "fb_1",
          type: "Feedback",
          name: "Suresh Kumar",
          email: "suresh.k@gmail.com",
          subject: "Tamil Nadu Chief Minister Higher Education & Skill Fellowship",
          message: "The scheme details helped me register for technical training in Coimbatore without confusion.",
          timestamp: "24/10/2026, 11:20:15 am",
          status: "Reviewed"
        },
        {
          id: "fb_2",
          type: "Report Issue",
          name: "Priya D",
          email: "priya.d@yahoo.com",
          subject: "PM Surya Ghar: Muft Bijli Yojana",
          message: "The external rooftop solar application server was slow yesterday. Please verify status.",
          timestamp: "27/10/2026, 04:45:10 pm",
          status: "Pending"
        }
      ];
      localStorage.setItem('ss_feedbacks', JSON.stringify(sampleFeedbacks));
    }
  },

  recordVisit() {
    let count = parseInt(localStorage.getItem('ss_visitors_count') || '142', 10);
    if (!sessionStorage.getItem('ss_visited_session')) {
      count += 1;
      localStorage.setItem('ss_visitors_count', count.toString());
      sessionStorage.setItem('ss_visited_session', 'true');
    }
    return count;
  },

  getVisitorCount() {
    return parseInt(localStorage.getItem('ss_visitors_count') || '142', 10);
  },

  getSavedProfile() {
    return JSON.parse(localStorage.getItem('ss_citizen_profile') || 'null');
  },

  saveProfile(profileData) {
    localStorage.setItem('ss_citizen_profile', JSON.stringify(profileData));
  },

  clearProfile() {
    localStorage.removeItem('ss_citizen_profile');
  },

  getFeedbacks() {
    return JSON.parse(localStorage.getItem('ss_feedbacks') || '[]');
  },

  addFeedback(feedback) {
    const list = this.getFeedbacks();
    feedback.id = "fb_" + Date.now();
    feedback.timestamp = new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });
    feedback.status = "Pending";
    list.unshift(feedback);
    localStorage.setItem('ss_feedbacks', JSON.stringify(list));
  },

  updateFeedbackStatus(id, newStatus) {
    const list = this.getFeedbacks().map(item => item.id === id ? { ...item, status: newStatus } : item);
    localStorage.setItem('ss_feedbacks', JSON.stringify(list));
  },

  deleteFeedback(id) {
    const list = this.getFeedbacks().filter(item => item.id !== id);
    localStorage.setItem('ss_feedbacks', JSON.stringify(list));
  },

  getSchemes() {
    const master = window.COMPREHENSIVE_SCHEMES_DATABASE || [];
    const custom = JSON.parse(localStorage.getItem('ss_custom_schemes') || '[]');
    const deletedIds = JSON.parse(localStorage.getItem('ss_deleted_schemes') || '[]');
    
    // Merge master with admin-created schemes, excluding deleted ones
    const all = [...custom, ...master];
    return all.filter(s => !deletedIds.includes(s.id));
  },

  addScheme(scheme) {
    const custom = JSON.parse(localStorage.getItem('ss_custom_schemes') || '[]');
    custom.unshift(scheme);
    localStorage.setItem('ss_custom_schemes', JSON.stringify(custom));
  },

  deleteScheme(schemeId) {
    // Check if custom
    let custom = JSON.parse(localStorage.getItem('ss_custom_schemes') || '[]');
    if (custom.some(s => s.id === schemeId)) {
      custom = custom.filter(s => s.id !== schemeId);
      localStorage.setItem('ss_custom_schemes', JSON.stringify(custom));
      return;
    }
    // Track deleted master scheme
    const deleted = JSON.parse(localStorage.getItem('ss_deleted_schemes') || '[]');
    deleted.push(schemeId);
    localStorage.setItem('ss_deleted_schemes', JSON.stringify(deleted));
  }
};

DB.init();