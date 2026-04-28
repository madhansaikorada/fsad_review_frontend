import React, { createContext, useContext, useState, useEffect } from 'react';
import { jsx as _jsx } from "react/jsx-runtime";
import { fetchServices, fetchReports, fetchFeedback, createReport, createFeedback } from '../services/api';
const AppContext = /*#__PURE__*/createContext(undefined);
export const AppProvider = ({
  children
}) => {
  const storedRole = localStorage.getItem('userRole');
  const storedUser = localStorage.getItem('currentUser');
  const [userRole, setUserRole] = useState(storedRole || null);
  const [currentUser, setCurrentUser] = useState(storedUser ? JSON.parse(storedUser) : null);
  const [reports, setReports] = useState([]);

  const [feedback, setFeedback] = useState([]);

  const [services, setServices] = useState([]);

  // Persist current user and feedback to localStorage
  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('currentUser', JSON.stringify(currentUser));
    } else {
      localStorage.removeItem('currentUser');
    }
  }, [currentUser]);

  useEffect(() => {
    localStorage.setItem('citiFeedback', JSON.stringify(feedback));
  }, [feedback]);

  // Persist services to sessionStorage
  useEffect(() => {
    if (services.length > 0) {
      sessionStorage.setItem('cityServices', JSON.stringify(services));
    }
  }, [services]);

  useEffect(() => {
    if (userRole) {
      localStorage.setItem('userRole', userRole);
    } else {
      localStorage.removeItem('userRole');
    }
  }, [userRole]);

  useEffect(() => {
    fetchServices()
      .then(data => {
        if (Array.isArray(data)) setServices(data);
      })
      .catch(error => {
        console.error('Failed to load services from backend:', error);
      });

    fetchReports()
      .then(data => {
        if (Array.isArray(data)) setReports(data);
      })
      .catch(error => {
        console.error('Failed to load reports from backend:', error);
      });

    fetchFeedback()
      .then(data => {
        if (Array.isArray(data)) setFeedback(data);
      })
      .catch(error => {
        console.error('Failed to load feedback from backend:', error);
      });
  }, []);

  const addReport = report => {
    const newReport = {
      ...report,
      date: new Date().toISOString().split('T')[0],
      status: 'pending',
      adminResponse: null
    };

    createReport(newReport)
      .then(savedReport => {
        setReports([savedReport, ...reports]);
      })
      .catch(error => {
        console.error('Failed to save report to backend:', error);
        setReports([newReport, ...reports]);
      });
  };

  const updateReportStatus = (id, status) => {
    setReports(reports.map(report => report.id === id ? {
      ...report,
      status
    } : report));
  };

  const addAdminResponse = (id, response) => {
    setReports(reports.map(report => report.id === id ? {
      ...report,
      adminResponse: response
    } : report));
  };

  const addFeedback = feedbackItem => {
    const newFeedback = {
      ...feedbackItem,
      id: feedbackItem.id || Date.now().toString()
    };

    const feedbackPayload = { ...newFeedback };
    delete feedbackPayload.id;

    createFeedback(feedbackPayload)
      .then(savedFeedback => {
        setFeedback([savedFeedback, ...feedback]);
      })
      .catch(error => {
        console.error('Failed to save feedback to backend:', error);
        setFeedback([newFeedback, ...feedback]);
      });
  };

  const updateServices = (updatedServices) => {
    setServices(updatedServices);
  };

  return /*#__PURE__*/_jsx(AppContext.Provider, {
    value: {
      userRole,
      setUserRole,
      currentUser,
      setCurrentUser,
      reports,
      addReport,
      updateReportStatus,
      addAdminResponse,
      feedback,
      addFeedback,
      services,
      updateServices
    },
    children: children
  });
};
export const useApp = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
