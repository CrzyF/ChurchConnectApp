import { create } from 'apisauce'

const client = create({
  baseURL: 'https://api-jitbrands-churchapp.azurewebsites.net/api/v1',
})

const login = (code) => client.get(`/Churches/${code}`)

const subscribeToNotices = (churchId, deviceToken) =>
  client.post(`/Churches/${churchId}/login?token=${deviceToken}`)

const unsubscribeToNotices = (churchId, deviceToken) =>
  client.post(`/Churches/${churchId}/logout?token=${deviceToken}`)

// Announcement
const getAnnouncement = (churchId) =>
  // cid = '201eac50-f931-40c1-95f6-e5613946cfec';
  client.get(`/Churches/${churchId}/notices?Type=Announcement`)

//   Notices
const getEvents = (churchId) =>
  client.get(`/Churches/${churchId}/notices?Type=Event`)

const getNews = (churchId) =>
  client.get(`/Churches/${churchId}/notices?Type=News`)

//   Support Service
const getFaqs = () => client.get(`/Supports/faqs`)

const sendConcern = (concern) =>
  client.post(`/Supports/complaints`, { body: JSON.stringify(concern) })

// Schedules
const getSchedules = (churchId) => client.get(`/Churches/${churchId}/schedules`)

// Schedules
const getLeaders = (churchId) => client.get(`/Churches/${churchId}/leaders`)

// Daily Readings
const getDailyReadings = (date) =>
  client.get(`/Supports/daily-readings/${date}`)

//   Exports
export default {
  login,
  getAnnouncement,
  getEvents,
  getNews,
  getFaqs,
  sendConcern,
  getSchedules,
  getLeaders,
  subscribeToNotices,
  unsubscribeToNotices,
  getDailyReadings,
}
