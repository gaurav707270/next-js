import DataTable from "./components/DataTable";

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-100">

      <div className="mx-auto max-w-7xl p-4 md:p-10">

        <div className="mb-5 flex">

          <p className="mt-2 text-gray-600" style={{ width: "80px" }}>
            <img className="rounded-4xl" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSlVMoUvUSJtJK32ahaxy1dJY-J1kk5M4osZ-K2Ek19cg&s=10" />
          </p>


          <h1 className="text-3xl font-bold p-5" >
            User Data Manager
          </h1>


        </div>

        <DataTable />

      </div>

    </main>
  );
}