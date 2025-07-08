import React from "react";
import API_BASE from "../config";

export default function Home() {
  const handleIntegrarConta = () => {
    window.location.href = `${API_BASE}/ml/auth`; // rota corrigida
  };

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      height: '100vh',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#f9f9f9'
    }}>
      <h2 style={{ marginBottom: '20px' }}>Bem-vindo ao IntegraSeller!</h2>
      <button
        onClick={handleIntegrarConta}
        style={{
          padding: '10px 20px',
          fontSize: '16px',
          borderRadius: '5px',
          backgroundColor: '#ffdb15',
          border: 'none',
          cursor: 'pointer'
        }}
      >
        Integrar Conta Mercado Livre
      </button>
    </div>
  );
}
