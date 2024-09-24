export interface AllProductsSliceState {
    currentWeatherData: WeatherObject | undefined
    weather: WeatherObject[]
    error: string | undefined
    isPending: boolean
  }
  
  export interface WeatherObject {
    id: string
    temperature: number
    iconCode: string
    city: string
  }
  