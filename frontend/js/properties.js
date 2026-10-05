export function renderPropertyCard(property) {
  const id = property.id;
  return `
    <article class="property-card">
      <div class="property-image">
        <span>${escapeHtml(property.property_type || "Property")}</span>
      </div>
      <div class="property-content">
        <h3>${escapeHtml(property.title || "Untitled property")}</h3>
        <p class="muted">${escapeHtml(property.location || "Location not available")}</p>
        <strong class="price">${formatPrice(property.price)}</strong>
        <div class="property-meta">
          <span>${property.bedrooms ?? "-"} Beds</span>
          <span>${property.bathrooms ?? "-"} Baths</span>
          <span>${property.area ?? "-"} sqft</span>
        </div>
        <a class="btn primary full" href="property-details.html?id=${encodeURIComponent(id)}">View Details</a>
      </div>
    </article>
  `;
}

function formatPrice(value) {
  if (value === null || value === undefined || value === "") return "Price on request";
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0
  }).format(value);
}

function escapeHtml(value) {
  return String(value ?? "").replace(/[&<>"']/g, char => ({
    "&":"&amp;",
    "<":"&lt;",
    ">":"&gt;",
    '"':"&quot;",
    "'":"&#039;"
  }[char]));
}
