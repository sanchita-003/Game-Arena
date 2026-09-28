export default function ConceptTags({ items }) {
  return (
    <div className="concept-box">
      <span className="concept-label">Concepts used:</span>
      <div className="concept-tags">
        {items.map((c, i) => <span key={i} className="concept-tag">{c}</span>)}
      </div>
    </div>
  )
}