import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";

class OrcaApi {
    static token;

    static async request(endpoint, data = {}, method = "get") {
      console.debug("API Call:", endpoint, data, method);
  
      const url = `${BASE_URL}/${endpoint}`;
      const headers = {};
      
      if (OrcaApi.token) {
          headers.Authorization = `Bearer ${OrcaApi.token}`;
      }
      
      const params = (method === "get")
          ? data
          : {};
  
      try {
          console.log({ url, method, data, params, headers })
          let res = await axios({ url, method, data, params, headers });
          return res.data;
      } catch (err) {
          console.error("API Error:", err.response.data);
          let message = err.response.data.error.message;
          throw Array.isArray(message) ? message : [message];
      }
  }

      static async providerLogin(data){
        let res = await this.request(`provider/login`, data, "post");
        return res.token
      }

      static async getPatientProviders(id){
        let res = await this.request(`patient/${id}/providers`)
        return res.providers
      }

      static async getProvider(id){
        let res = await this.request(`provider/${id}`);
        return res.provider
      }

      static async patientLogin(data){
        let res = await this.request(`patient/login`, data, "post");
        return res.token
      }

      static async getPatient(id){
        let res = await this.request(`patient/${id}`)
        return res.patient
      }

      static async searchPatient(data){
        let res = await this.request('patient/find-patient', data, 'post');
        return res.patient;
      }

      static async searchDoctor(data){
        let res = await this.request("provider/find-doctor", data, "post")
        return res.doctor
      }

      static async searchOffice(data){
        let res = await this.request("provider/find-office", data, "post")
        return res.office
      }

      static async getProviderPatients(id){
        let res = await this.request(`provider/${id}/patients`)
        return res.patients
      }

      static async getProviderDoctors(id){
        let res = await this.request(`provider/${id}/doctors`)
        return res.doctors
      }

      static async getProviderOffices(id){
        let res = await this.request(`provider//${id}/offices`)
        return res.offices
      }

      static async getPatientAppointments(id){
        let res = await this.request(`patient/${id}/appointments`)
        return res.appointments 
      }

      static async getDoctorAppointments(id){
        let res = await this.request(`provider/doctors/${id}/appointments`)
        return res.appointments 
      }

      static async providerAdminToggle(id, status){
        let res = await this.request(`provider/${id}/toggle-admin`, {status:status}, "post")
        return res.admin
      }

      static async createPatient(data){
        let res = await this.request(`admin/patients`, data, "post")
        return res
      }

      static async removePatient(data) {    
        let result = await this.request('patient/find-patient', data, 'post');
    
        const patient_id = result.patient.id;
    
        let res = await this.request(`admin/patients/${patient_id}`, {}, 'delete');
        return res;
    }

    static async createDoctor(data){
      let res = await this.request(`admin/doctors`, data, "post")
      return res
    }

    static async getDoctor(id){
      let res = await this.request(`provider/doctors/${id}`)
      return res.doctor
    }

    static async removeDoctor(data){
      let result = await this.request(`provider/find-doctor`, data, "post")
      const doctor_id = result.doctor.id

      let res = await this.request(`admin/doctors/${doctor_id}`, {}, "delete")
      return res
    }

    static async createOffice(data){
      let res = await this.request(`admin/offices`, data, "post")
      return res
    }

    static async getOffice(id){
      let res = await this.request(`provider/offices/${id}`)
      return res.office
    }

    static async removeOffice(data){
      let result = await this.request(`provider/find-office`, data, "post")
      const office_id = result.office.id

      let res = await this.request(`admin/offices/${office_id}`, {}, "delete")
      return res
    }

    static async createAppointment(data){
      let { date, date_of_birth, phone_num, first_name, last_name, address, provider_id } = data

      let patientRes = await this.request('patient/find-patient', {phone_num, date_of_birth}, 'post');
      let patient_id = patientRes.patient.id;

      let doctorRes = await this.request("provider/find-doctor", {first_name, last_name, provider_id}, "post");
      let doctor_id = doctorRes.doctor.id;
     
      let officeRes = await this.request("provider/find-office", {address, provider_id}, "post")
      let office_id = officeRes.office.id; 
    
      let appointmentData = {
        date: date, 
        patient_id: patient_id,
        doctor_id: doctor_id,
        office_id: office_id
      }    

      let res = await this.request("provider/appointments", appointmentData, "post")
      return res
    }

    static async removeAppointment(data){
      let { date, date_of_birth, phone_num, first_name, last_name, provider_id } = data

      let patientRes = await this.request('patient/find-patient', {phone_num, date_of_birth}, 'post');
      let patient_id = patientRes.patient.id;

      let doctorRes = await this.request("provider/find-doctor", {first_name, last_name, provider_id}, "post");
      let doctor_id = doctorRes.doctor.id;
    
      let appointmentData = {
        date: date, 
        patient_id: patient_id,
        doctor_id: doctor_id
      }

      let appointmentRes =  await this.request("provider/find-appointment", appointmentData, "post");

      let appointment_id = appointmentRes.appointment.id

      let res = await this.request(`provider/appointments/${appointment_id}`, {}, "delete")
      
      return res
    }

  static async postMessage(data){
    let res = this.request(`message/post`, data, "post")
    return res
  }

  static async getMessages(data){
    let res = this.request(`message/get`, data, "post")
    return res
  }
    
}

export default OrcaApi