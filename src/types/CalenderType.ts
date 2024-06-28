export default interface CalenderType {
    isModal: boolean
    setIsModal:(isModel: boolean) => void
    checkIn: number[]
    checkOut: number[]
}