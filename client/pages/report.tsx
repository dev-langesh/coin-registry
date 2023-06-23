import React, { useState } from "react";
import ReportFilterForm from "../components/report/reportFilterForm";
import ReportTable from "../components/report/reportTable";

export default function Report() {
  const [state, setState] = useState<any>({});

  return (
    <div className="pt-16 p-6">
      <h1 className="text-2xl text-blue-500 font-bold text-center">
        SREC COIN - Usage Report
      </h1>

      <ReportFilterForm setState={setState} />
      <ReportTable
        data={state.studentCount}
        maxUsed={state.maxUsed}
        maxRecordCount={state.maxRecordCount}
      />
    </div>
  );
}
