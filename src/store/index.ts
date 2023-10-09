import { defineStore } from 'pinia'
import location from './module/location'

export function useStore() {
  return {
    location: location(),
  }
}
