import { clients } from "../constants";
import styles from "../style";

const Clients = () => (
  <section className={`${styles.flexCenter} my-4`}>
    <div className="relative flex overflow-x-hidden">
  <div className="py-12 animate-marquee whitespace-nowrap">
    <div className={`${styles.flexCenter} flex-wrap w-full`}>
      {clients.map((client) => (
        <div key={client.id} className={`flex-1 ${styles.flexCenter} sm:min-w-[192px] min-w-[120px] m-5`}>
          <img src={client.logo} alt="client_logo" className="sm:w-[192px] w-[100px] object-contain" />
        </div>
      ))}
        </div>

    </div>
    <div className="absolute top-0 py-12 animate-marquee2 whitespace-nowrap">
    <div className={`${styles.flexCenter} flex-wrap w-full`}>
      {clients.map((client) => (
        <div key={client.id} className={`flex-1 ${styles.flexCenter} sm:min-w-[192px] min-w-[120px] m-5`}>
          <img src={client.logo} alt="client_logo" className="sm:w-[192px] w-[100px] object-contain" />
        </div>
      ))}
        </div>
    
  </div>
    </div>
  </section>
);

export default Clients;