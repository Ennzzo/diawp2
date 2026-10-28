import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  obterVotos,
  calcularTotalVotos,
  calcularResultado,
  zerarVotos,
} from '../services/votacaoService';

function Resultado() {
  const [votos, setVotos] = useState(() => obterVotos());

  const total = calcularTotalVotos(votos);
  const resultado = calcularResultado(votos);

  function handleZerar() {
    if (window.confirm('Apagar todos os votos?')) {
      zerarVotos();
      setVotos({});
    }
  }

  return (
    <main className="pagina">
      <section className="pagina-cabecalho">
        <h1>Parcial da eliminação</h1>
        <p className="total-votos">
          <strong>{total}</strong> {total === 1 ? 'voto computado' : 'votos computados'}
        </p>
      </section>

      {total === 0 ? (
        <div className="resultado-vazio">
          <p>Nenhum voto foi registrado ainda.</p>
          <Link to="/votacao" className="botao botao-principal">Votar agora</Link>
        </div>
      ) : (
        <>
          <ol className="placar">
            {resultado.map((p, indice) => (
              <li key={p.id} className={indice === 0 ? 'placar-item placar-lider' : 'placar-item'}>
                <img src={p.foto} alt={p.nome} className="placar-foto" />
                <div className="placar-info">
                  <h2 className="placar-nome">
                    {p.nome}
                    {indice === 0 && <span className="selo-lider">Sairia hoje</span>}
                  </h2>
                  <div className="barra">
                    <div
                      className="barra-preenchida"
                      style={{ width: `${p.percentual}%` }}
                    />
                  </div>
                  <p className="placar-numeros">
                    {p.percentual.toLocaleString('pt-BR', { maximumFractionDigits: 1 })}% ({p.votos}{' '}
                    {p.votos === 1 ? 'voto' : 'votos'})
                  </p>
                </div>
              </li>
            ))}
          </ol>

          <button type="button" className="botao botao-zerar" onClick={handleZerar}>
            Zerar votação
          </button>
        </>
      )}
    </main>
  );
}

export default Resultado;
