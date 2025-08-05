import { getServiceBySlug } from "@/lib/serviceData";
import EditService from "./EditService";


export default async function EditServicePage({ params }) {
  const { id } = await params;

  const data = await getServiceBySlug(id);

  if(!data){
    return <div>Page not found !</div>
  }

  return <EditService initialData={data} />;
}
