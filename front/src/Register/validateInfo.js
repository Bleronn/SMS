export default function validateInfo(values) {
    let errors = {};
  
    if (!values.username.trim()) {
        errors.username = 'Kërkohet Username';
      }
   else if (!/^[A-Za-z]+/.test(values.username.trim())) {
       errors.name = 'Shkruaje Username ne rrregull';
     }
    
     if (!values.surname) {
        errors.surname = 'Kërkohet Emri dhe Mbiemri';
      }
     else if (!/^[A-Za-z]+/.test(values.surname)) {
       errors.surname = 'Shkruaje Mbiemrin real';
     }
  
    if (!values.email) {
      errors.email = 'Kërkohet Email';
    } else if (!/\S+@\S+\.\S+/.test(values.email)) {
      errors.email = 'Adresa e emailit është e pavlefshme';
    }
    if (!values.password) {
      errors.password = 'Kërkohet fjalëkalimi';
    } else if (values.password.length < 8) {
      errors.password = 'Fjalëkalimi duhet të ketë 8 karaktere ose më shumë';
    }
  
    if (!values.kontakti) {
      errors.kontakti = 'Kërkohet numri i telefonit';
    } else if (values.kontakti.length < 6) {
      errors.kontakti = 'Numri nuk eshe ne rregull';
    }
    return errors;
  }

