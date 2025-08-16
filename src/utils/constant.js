export const BASE_URL = window.origin.includes('localhost') ? 'http://localhost:7777':  '/api'

export const endPoints= {
  login:  '/login',
  getProfile: '/profile/view',
  logout: '/logout',
  feed: '/feed',
  editProfile: '/profile/edit',
  connections: '/user/connections',
  requests: '/user/requests/received',
  sendRequest: '/request/send/interested',
  ignoreRequest: '/request/send/ignored',
  reviewRequest: '/request/review',
  signup: '/signup',
}