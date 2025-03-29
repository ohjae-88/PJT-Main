
import React, { useEffect, useState } from "react";
import * as XLSX from "xlsx";

<<<<<<< HEAD
=======
const fieldLabels = {
  name: "이름",
  ssn: "주민번호",
  phone: "연락처(1)",
  phoneName: "연락처명(1)",
  subPhone: "연락처(2)",
  subPhoneName: "연락처명(2)",
  dong: "동",
  ho: "호",
  joinRound: "조합가입회차",
  qualification: "조합원자격",
  type: "타입",
  transfer: "명의변경 여부",
  previousName: "명의변경전 명의자",
  note: "특이사항"
};

>>>>>>> df15f370754e23e4270f9f601ff5b7e86d6cdd69
function BuyersTable() {
  const [buyers, setBuyers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
<<<<<<< HEAD
  
=======
  const [selectedBuyer, setSelectedBuyer] = useState(null);
  const [editBuyer, setEditBuyer] = useState(null);

>>>>>>> df15f370754e23e4270f9f601ff5b7e86d6cdd69
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

<<<<<<< HEAD
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
=======
  const handleDelete = async (index) => {
    if (window.confirm("정말로 삭제하시겠습니까?")) {
      const deletedBuyer = buyers[index];
      try {
        await fetch("https://your-api-endpoint/delete", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(deletedBuyer)
        });
        const updated = [...buyers];
        updated.splice(index, 1);
        setBuyers(updated);
        setSelectedBuyer(null);
        setEditBuyer(null);
      } catch (err) {
        console.error("서버 삭제 실패:", err);
        alert("서버 삭제 중 오류 발생");
      }
    }
  };

  const handleEditSave = async () => {
    if (!editBuyer) {
      alert("수정할 데이터가 없습니다.");
      return;
    }
    try {
      const updated = buyers.map((b) =>
        b.ssn === editBuyer.ssn ? editBuyer : b
      );
      setBuyers(updated);
      alert("수정이 완료되었습니다.");
      setEditBuyer(null);
      setSelectedBuyer(null);
    } catch (err) {
      console.error("수정 실패:", err);
      alert("수정 중 오류 발생");
    }
  };

  const filterBuyers = buyers.filter((b) => {
    const keyword = search.toLowerCase();
    return (
      b.name?.toLowerCase().includes(keyword) ||
      b.phone?.toLowerCase().includes(keyword) ||
      b.subPhone?.toLowerCase().includes(keyword) ||
      b.ssn?.toLowerCase().includes(keyword) ||
      b.dong?.toLowerCase().includes(keyword) ||
      b.ho?.toLowerCase().includes(keyword) ||
      `${b.dong}-${b.ho}`.includes(keyword)
    );
  });

  return (
    <div style={{ padding: "2rem", fontFamily: "sans-serif" }}>
      <h2>📋 분양자 카드 목록</h2>
      <div style={{ position: "relative", display: "inline-block", marginBottom: "1rem" }}>
        <input
          type="text"
          placeholder="검색 (이름, 연락처, 주민번호, 동-호 등)"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{ padding: "8px 30px 8px 8px", width: "360px" }}
        />
        {search && (
          <button
            onClick={() => setSearch("")}
            style={{
              position: "absolute",
              right: "8px",
              top: "50%",
              transform: "translateY(-50%)",
              background: "transparent",
              border: "none",
              fontSize: "16px",
              cursor: "pointer"
            }}
          >
            ✕
          </button>
        )}
      </div>

      <button onClick={exportToExcel} style={{ marginBottom: "1rem", marginLeft: "1rem" }}>
        엑셀로 저장 (다른이름)
      </button>

      {loading ? (
        <p>⏳ 로딩 중...</p>
      ) : (
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: "1rem",
          marginTop: "1.5rem"
        }}>
          {filterBuyers.map((b, i) => (
            <div key={i} style={{ border: "1px solid #ccc", borderRadius: "8px", padding: "1rem" }}>
              <h3>{b.name}</h3>
              <p><strong>주민번호:</strong> {b.ssn}</p>
              <p><strong>연락처(1):</strong> {b.phone} ({b.phoneName})</p>
              <p><strong>연락처(2):</strong> {b.subPhone} ({b.subPhoneName})</p>
              <p><strong>동-호:</strong> {b.dong}-{b.ho}</p>
              <p><strong>조합가입회차:</strong> {b.joinRound}</p>
              <p><strong>조합원자격:</strong> {b.qualification}</p>
              <button onClick={() => setSelectedBuyer(b)} style={{ marginTop: "0.5rem" }}>
                상세보기
              </button>
>>>>>>> df15f370754e23e4270f9f601ff5b7e86d6cdd69
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default BuyersTable;
