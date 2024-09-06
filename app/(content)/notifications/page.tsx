import { TabsAll } from "@/components/ui/tabs"
import { NotifCards } from "@/components/notifications/notif-cards"

export default function Notifications(){
    return(
        <>
            <h1 className="ml-3 text-2xl py-4 font-bold">Notifications</h1>
            <NotifCards/>
        </>
    )
}