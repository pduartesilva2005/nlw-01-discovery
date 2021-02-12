function populateUFs() {
    const ufSelect = document.querySelector("select[name=uf]")

    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados").then(res => res.json()).then(states => {
        for(const state of states) {
            ufSelect.innerHTML += `<option value="${state.id}">${state.nome}</option>`
        }
    })
}

populateUFs()

function getCities(event) {
    const citySelect = document.querySelector("select[name=city]")

    const stateInput = document.querySelector("input[name=state]")

    const ufValue = event.target.value

    const indexOffSelectedState = event.target.selectedIndex

    stateInput.value = event.target.options[indexOffSelectedState].text

    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`

    citySelect.innerHTML = "<option value></option>"
    citySelect.disabled = true

    fetch(url).then(res => res.json()).then(cities => {
        for(const city of cities) {
            citySelect.innerHTML += `<option value="${city.nome}">${city.nome}</option>`
        }

        citySelect.disabled = false
    })
}

document.querySelector("select[name=uf]").addEventListener("change", getCities)

/* Itens de coleta
Pegar todso os li's */
const itemsToCollet = document.querySelectorAll(".items-grid li")

for (const item of itemsToCollet) {
    item.addEventListener("click", handleSelectedItem)
}

const collectedItems = document.querySelector("input[name=items]")

let selectedItems = []

function handleSelectedItem(event) {
    const itemLi = event.target

    // Adicionar ou remover uma classe com JavaScript
    itemLi.classList.toggle("selected")
    

    const itemId = itemLi.dataset.id

    //console.log('ITEM ID: ', itemId)

    /* Verificar se existem itens selecionados, se existir ele pegar os items selecionados. */
    const alreadySelected = selectedItems.findIndex(item => {
        const itemFound = item == itemId
        // Issio será true ou false
        return itemFound
    })

    /* Se já estiver selecionado, tirar da seleção.*/
    if(alreadySelected >= 0) {
        // Tirar da Seleção
        const filteredItems = selectedItems.filter(item => {
            const itemIsDifferent = item != itemId // False
            return itemIsDifferent
        })

        selectedItems = filteredItems
    } else {
        /* Senão ele vai adicionar a seleção. */
        selectedItems.push(itemId)
    }

    //console.log('selectedItems: ', selectedItems)
    
    /* Atualizar o campo escondido com os items selecionados */
    collectedItems.value = selectedItems
}