export const formatPhoneNumber = (phone) => {
    // Remove any non-digit characters
    const cleaned = phone.replace(/\D/g, '');
    
    // If number starts with 0, remove it
    const withoutLeadingZero = cleaned.startsWith('0') ? cleaned.substring(1) : cleaned;
    
    // Add +254 prefix if not present
    return withoutLeadingZero.startsWith('254') ? `+${withoutLeadingZero}` : `+254${withoutLeadingZero}`;
  };
  
  export const stripPhonePrefix = (phone) => {
    return phone.replace(/^\+254/, '');
  };