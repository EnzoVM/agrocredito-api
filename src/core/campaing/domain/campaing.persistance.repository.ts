import Campaing from "./campaing.model";

export default interface CampaingPersistanceRepository {

    createCampaing: (campaing: Campaing) => Promise<Campaing>
    deleteCampaing: (campaingId: string) => Promise<Campaing>
    listCampaing: () => Promise <Campaing[]>

}