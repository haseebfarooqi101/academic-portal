// Email validation
export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Password validation
export const validatePassword = (password) => {
  return password.length >= 6;
};

// Name validation
export const validateName = (name) => {
  return name.trim().length >= 2;
};

// Phone validation
export const validatePhone = (phone) => {
  const phoneRegex = /^\d{10}$/;
  return phoneRegex.test(phone.replace(/\D/g, ''));
};

// Student ID validation
export const validateStudentId = (studentId) => {
  return studentId.trim().length >= 3;
};

// Department validation
export const validateDepartment = (department) => {
  const validDepartments = ['Computer Science', 'Mathematics', 'Physics', 'Chemistry', 'Biology', 'English'];
  return validDepartments.includes(department);
};

// Year validation
export const validateYear = (year) => {
  const validYears = ['1st Year', '2nd Year', '3rd Year', '4th Year'];
  return validYears.includes(year);
};

// Subject validation
export const validateSubject = (subject) => {
  return subject.trim().length >= 2;
};

// Experience validation
export const validateExperience = (experience) => {
  const exp = parseInt(experience);
  return !isNaN(exp) && exp >= 0 && exp <= 50;
};

// Qualification validation
export const validateQualification = (qualification) => {
  const validQualifications = ['Bachelor\'s', 'Master\'s', 'PhD', 'Diploma'];
  return validQualifications.includes(qualification);
};

// Form validation helper
export const validateForm = (formData, requiredFields) => {
  const errors = {};
  
  requiredFields.forEach(field => {
    if (!formData[field] || formData[field].toString().trim() === '') {
      errors[field] = `${field.charAt(0).toUpperCase() + field.slice(1)} is required`;
    }
  });

  // Specific field validations
  if (formData.email && !validateEmail(formData.email)) {
    errors.email = 'Please enter a valid email address';
  }

  if (formData.password && !validatePassword(formData.password)) {
    errors.password = 'Password must be at least 6 characters long';
  }

  if (formData.name && !validateName(formData.name)) {
    errors.name = 'Name must be at least 2 characters long';
  }

  if (formData.phone && !validatePhone(formData.phone)) {
    errors.phone = 'Please enter a valid 10-digit phone number';
  }

  if (formData.studentId && !validateStudentId(formData.studentId)) {
    errors.studentId = 'Student ID must be at least 3 characters long';
  }

  if (formData.department && !validateDepartment(formData.department)) {
    errors.department = 'Please select a valid department';
  }

  if (formData.year && !validateYear(formData.year)) {
    errors.year = 'Please select a valid year';
  }

  if (formData.subject && !validateSubject(formData.subject)) {
    errors.subject = 'Subject must be at least 2 characters long';
  }

  if (formData.experience && !validateExperience(formData.experience)) {
    errors.experience = 'Experience must be a valid number between 0 and 50';
  }

  if (formData.qualification && !validateQualification(formData.qualification)) {
    errors.qualification = 'Please select a valid qualification';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};

// Password confirmation validation
export const validatePasswordConfirmation = (password, confirmPassword) => {
  return password === confirmPassword;
};

// File validation
export const validateFile = (file, allowedTypes = [], maxSize = 5 * 1024 * 1024) => {
  if (!file) return { isValid: false, error: 'No file selected' };
  
  if (allowedTypes.length > 0 && !allowedTypes.includes(file.type)) {
    return { isValid: false, error: 'Invalid file type' };
  }
  
  if (file.size > maxSize) {
    return { isValid: false, error: 'File size too large' };
  }
  
  return { isValid: true, error: null };
};