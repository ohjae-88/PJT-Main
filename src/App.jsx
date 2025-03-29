
import React, { useEffect, useState } from "react";
import * as XLSX from "xlsx";

function BuyersTable() {
  const [buyers, setBuyers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  
  useEffect(() => {
    fetch("https://buyers-data.vercel.app/data/buyersList.json")
      .then((res) => res.json())
      .then((data) => {
        setBuyers(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("데이터 로딩 실패:", err);
        setLoading(false);
      });
  }, []);

  const exportToExcel = () => {
    try {
      if (!buyers.length) {
        alert("저장할 데이터가 없습니다.");
        return;
      }
      const worksheet = XLSX.utils.json_to_sheet(buyers);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "분양자정보");
      XLSX.writeFile(workbook, `분양자정보_${new Date().toISOString().slice(0,10)}.xlsx`);
    } catch (error) {
      console.error("엑셀 저장 중 오류 발생:", error);
      alert("엑셀 저장에 실패했습니다.");
    }
  };

  return (
    <div>
      <h2>📋 분양자 카드 목록</h2>
      <input
        type="text"
        placeholder="검색 (이름, 연락처, 주민번호, 동-호 등)"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{ padding: "8px", width: "300px" }}
      />
      <button onClick={exportToExcel}>엑셀로 저장</button>
      {loading ? (
        <p>로딩 중...</p>
      ) : (
        <div>
          {buyers.map((buyer, i) => (
            <div key={i}>
              <h3>{buyer.name}</h3>
              <p>{buyer.ssn}</p>
              <p>{buyer.phone}</p>
              <p>{buyer.subPhone}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default BuyersTable;
