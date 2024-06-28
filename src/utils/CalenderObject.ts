import CurrentDay from "./CurrentDay";
import NextMont from "./NextMonth";

interface props {
    year: number
    month: number
    reservation: number[]
}
enum DAY{
    SUNDAY,
    MONDAY,
    TUESDAY,
    WEDNESDAY,
    THURSDAY,
    FRIDAY,
    SATURDAY
}
export default function CalenderObject({year, month, reservation}: props){
    let array: { date: number; day: number; reservation: number }[] = []
    const currentDate = CurrentDay();
    if (currentDate.month === month) {
        const firstDate = new Date(year, month-1, 1);
        const lastDate = new Date(year, month, 0);

        let day = firstDate.getDay()

        if(currentDate.year > year || currentDate.month > month){
            for(let i = 1; i <= lastDate.getDate(); i++){
                if(day > 6){
                    day = 0;
                }
                array.push({date: i, day: day, reservation: 0});
                day++
            }
        } else {
            for(let i = 1; i <= lastDate.getDate(); i++){
                let coin = 0
                if(day > 6){
                    day = 0;
                }
                if(i < currentDate.date){
                    array.push({date: i, day: day, reservation: 0});
                } else {
                    reservation.forEach((e) => {
                        if (e === i) {
                            array.push({date: i, day: day, reservation: 0});
                            coin = 1;
                        }
                    })
                    if(coin !== 1){
                        array.push({date: i, day: day, reservation: 1});
                        coin = 0;
                    }
                }
                day++
            }
        }
        return array
    } else {
        const nextMonth = NextMont();
        const firstDate = new Date(year, month, 1);
        const lastDate = new Date(year, month, 0);

        let day = firstDate.getDay()

        if(nextMonth.year > year || nextMonth.month > month){
            for(let i = 1; i <= lastDate.getDate(); i++){
                if(day > 6){
                    day = 0;
                }
                array.push({date: i, day: day, reservation: 0});
                day++
            }
        } else {
            for(let i = 1; i <= lastDate.getDate(); i++){
                let coin = 0
                if(day > 6){
                    day = 0;
                }
                reservation.forEach((e) => {
                    if (e === i) {
                        array.push({date: i, day: day, reservation: 0});
                        coin = 1;
                    }
                })
                if(coin !== 1){
                    array.push({date: i, day: day, reservation: 1});
                    coin = 0;
                }
                day++
            }
        }
        return array
    }

}