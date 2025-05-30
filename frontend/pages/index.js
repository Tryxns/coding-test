import { useState, useEffect, Component } from "react";
import Table from '../components/Table';
import 'tailwindcss';
import 'flowbite';
// import { Modal } from 'flowbite';
import SalesModal from "../components/SalesModal";
import Spinner from "../components/Spinner";

export default function Home() {
  // const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [dataSales, setDataSales] = useState([]);
  const [dataModal, setDataModal] = useState([]);
  const [selectedSalesRep, setSelectedSalesRep] = useState(0);

  const [filterName, setFilterName] = useState("");
  const [filterRole, setFilterRole] = useState("");
  const [filterRegion, setFilterRegion] = useState("");

  const searchName = (e) => {
    setFilterName(e.target.value)
  }

  const searchRole= (e) =>{
    setFilterRole(e.target.value)
  }

  // const selectSales = (event)=>{
  //   setSelectedSalesRep(event.target.id-1);

  //   const $targetEl = <SalesModal />;
  //   const options = {
  //       placement: 'center-center',
  //       backdrop: 'dynamic',
  //       backdropClasses:
  //           'bg-gray-900/50 dark:bg-gray-900/80 fixed inset-0 z-40',
  //       closable: true,
  //       onHide: () => {
  //           console.log('modal is hidden');
  //       },
  //       onShow: () => {
  //           console.log('modal is shown');
  //       },
  //       onToggle: () => {
  //           console.log('modal has been toggled');
  //       },
  //   };
  //   const xmodal = new Modal($targetEl, options);
  //   xmodal.show();
  // }

  // // set the modal menu element
  // const $targetEl = <SalesModal />;

  // // options with default values
  // const options = {
  //     placement: 'center-center',
  //     backdrop: 'dynamic',
  //     backdropClasses:
  //         'bg-gray-900/50 dark:bg-gray-900/80 fixed inset-0 z-40',
  //     closable: true,
  //     onHide: () => {
  //         console.log('modal is hidden');
  //     },
  //     onShow: () => {
  //         console.log('modal is shown');
  //     },
  //     onToggle: () => {
  //         console.log('modal has been toggled');
  //     },
  // };

  // // instance options object
  // const instanceOptions = {
  //   id: 'modalEl',
  //   override: true
  // };

  // const xmodal = new Modal($targetEl, options, instanceOptions);

  // =====Original=====
  // useEffect(() => {
  //   fetch("http://localhost:8000/api/data")
  //     .then((res) => res.json())
  //     .then((data) => {
  //       setUsers(data || []);        
  //       setLoading(false);
  //     })
  //     .catch((err) => {
  //       console.error("Failed to fetch data:", err);
  //       setLoading(false);
  //     });

  // }, []);
    // =====Original End=====

  useEffect(() => {
    let url = "http://localhost:8000/api/sales-reps?";
    let filters = [];
    if(filterName!="") filters.push('name='+filterName.toLowerCase());
    if(filterRole!="") filters.push('role='+filterRole.toLowerCase());
    if(filterRegion!="") filters.push('region='+filterRegion.toLowerCase());

    if (filters.length > 0) url += filters.join('&');

    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setDataSales(data || []);    
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch data:", err);
        setLoading(false);
      });

  }, [filterName, filterRole]);
  
  const handleAskQuestion = async () => {
    try {
      const response = await fetch("http://localhost:8000/api/ai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question }),
      });
      const data = await response.json();
      setAnswer(data.answer);
    } catch (error) {
      console.error("Error in AI request:", error);
    }
  };

  return (
    <div style={{ padding: "2rem" }}>
      <link href="https://cdn.jsdelivr.net/npm/flowbite@3.1.2/dist/flowbite.min.css" rel="stylesheet" />
      <h1 className="text-center">Next.js + FastAPI Sample</h1>

      {/* <section style={{ marginBottom: "2rem" }}>
        <h2>Dummy Data</h2>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <ul>
            {users.map((user) => (
              <li key={user.id}>
                {user.name} - {user.role}
              </li>
            ))}
          </ul>
        )}
      </section> */}
      <section className="m-auto">
        {
          (()=>{
            return loading ? <Spinner />:
            <Table 
            datatable={dataSales} 
            filterName={searchName}
            filterRole={searchRole}
            >

            </Table>;
          })()

        }
        <SalesModal datamodal={dataModal}></SalesModal>
      </section>

      <section className="mt-5">
        <h2>Ask a Question (AI Endpoint)</h2>
        <div className="flex">
          <input
            type="text"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Enter your question..."
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
          />
          <button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 ml-2" onClick={handleAskQuestion}>Ask</button>
        </div>
        {answer && (
          <div style={{ marginTop: "1rem" }}>
            <strong>AI Response:</strong> {answer}
          </div>
        )}
      </section>
      {/* <script src="../node_modules/flowbite/dist/flowbite.min.js"></script> */}
      <script src="https://cdn.jsdelivr.net/npm/flowbite@3.1.2/dist/flowbite.min.js"></script>

    </div>
  );
}
