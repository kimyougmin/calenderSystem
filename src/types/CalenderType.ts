export default interface CalenderType {
    isModal: boolean
    setIsModal:(isModel: boolean) => void
    checkIn: number[]
    setCheckIn: (checkIn: number[]) => void
    checkOut: number[]
    setCheckOut: (checkOut: number[]) => void
    count: number
    setCount: (count: number) => void
}