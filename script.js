// --- BANCO DE DADOS DE SERVIÇOS (Extenso conforme solicitado) ---
const catalogo = {
    web: [
        { nome: "Landing Page", tech: "[HTML5, Tailwind, Next.js]", desc: "Página única, ultrarápida, pixel instalado, botão sticky.", preco: "R$ 350+", tempo: "Algumas horas" },
        { nome: "Site Institucional", tech: "[WordPress ou Next.js]", desc: "Home, Sobre, Serviços, Contato. Painel administrativo.", preco: "R$ 600+", tempo: "1 dia" },
        { nome: "Loja WooCommerce", tech: "[WordPress + WooCommerce]", desc: "Loja própria sem mensalidade, PagSeguro/Mercado Pago.", preco: "R$ 900+", tempo: "1 dia" }
    ],
    sistemas: [
        { nome: "Micro-SaaS", tech: "[React, Node.js, Supabase]", desc: "Login, dashboard, funcionalidade core e pagamentos (Stripe).", preco: "R$ 2k+", tempo: "1 semana" },
        { nome: "Plataforma Educacional", tech: "[Next.js, Video Player]", desc: "Área de membros, quiz, certificados automáticos.", preco: "R$ 2k+", tempo: "1 semana" },
        { nome: "Dashboard Financeiro", tech: "[React, Python, SQL]", desc: "Gráficos, relatórios PDF/Excel, níveis de acesso.", preco: "R$ 1.2k+", tempo: "1 semana" },
        { nome: "Hub de Integração", tech: "[Node.js, Webhooks]", desc: "Conexão APIs (Bling ↔ MktPlace ↔ Site) em tempo real.", preco: "R$ 1.0k+", tempo: "1 semana" },
        { nome: "App Nativo (Mobile)", tech: "[React Native Expo]", desc: "App para agendamento, catálogo e notificações Push.", preco: "R$ 1.0k+", tempo: "1 semana" },
        { nome: "App Complexo (Uber/Social)", tech: "[React Native + Backend]", desc: "Geolocalização, RPGs simples, Redes Sociais.", preco: "R$ 2k+", tempo: "2 semanas" },
        { nome: "Migração Web > Mobile", tech: "[React Native]", desc: "Converter site React em App nativo reaproveitando lógica.", preco: "R$ 600-1k", tempo: "3 dias" }
    ],
    automacao: [
        { nome: "Chatbot IA / WhatsApp", tech: "[Python, OpenAI, Gemini]", desc: "Atendente 24/7, filtra leads e agenda reuniões.", preco: "R$ 400+", tempo: "Imediato/Config" },
        { nome: "Automação RPA", tech: "[Python, Selenium]", desc: "Robôs para varrer sites, extrair dados e preencher planilhas.", preco: "R$ 400+", tempo: "4 dias" },
        { nome: "Gerador de Conteúdo IA", tech: "[API GPT/Gemini]", desc: "Cria textos, blogs e relatórios personalizados.", preco: "R$ 1.5k+", tempo: "2 dias" }
    ]
};

// --- LÓGICA DO CHATBOT ---

const chatBox = document.getElementById('chat-box');
const userInput = document.getElementById('user-input');
const sendBtn = document.getElementById('send-btn');
const quickReplies = document.getElementById('quick-replies');
const infoPanel = document.getElementById('info-panel');

// Som de notificação (opcional)
// const msgSound = new Audio('path_to_sound.mp3'); 

let step = 0; // Controla o fluxo da conversa

// Inicialização
window.onload = () => {
    addBotMessage("Olá! Sou a IA da <strong>YK Software House</strong>.");
    setTimeout(() => {
        addBotMessage("Desenvolvemos de Landing Pages rápidas até Sistemas Complexos com I.A.");
        setTimeout(() => {
            addBotMessage("Como posso ajudar você hoje?");
            setQuickReplies(["Quero um Site/Loja", "Sistema/App Complexo", "Automação & I.A.", "Ver Portfólio"]);
        }, 800);
    }, 800);
};

// Enviar mensagem ao clicar ou Enter
sendBtn.addEventListener('click', handleUserMessage);
userInput.addEventListener('keypress', (e) => { if(e.key === 'Enter') handleUserMessage(); });

function handleUserMessage() {
    const text = userInput.value.trim();
    if (!text) return;
    
    addUserMessage(text);
    userInput.value = '';
    processBotResponse(text);
}

// Processamento da resposta (Simulação de IA)
function processBotResponse(text) {
    showTyping();
    
    // Normaliza texto para facilitar a busca
    const lowerText = text.toLowerCase();
    let reply = "";
    let options = [];

    setTimeout(() => {
        removeTyping();

        // Lógica simples de decisão baseada em palavras-chave
        if (lowerText.includes("quero um chatbot") || lowerText.includes("falar no whatsapp") || lowerText.includes("zap")) {
            reply = `
                Ótima decisão! Vamos automatizar seu atendimento. 🤖💬<br>
                Chame nosso especialista agora mesmo para configurar seu Bot:
                <br><br>
                <a href="https://wa.me/5548985036092?text=Olá, quero um Chatbot para minha empresa." 
                   target="_blank" 
                   class="inline-flex items-center bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded transition-transform hover:scale-105 shadow-md no-underline">
                    <i class="fab fa-whatsapp mr-2"></i> Iniciar Conversa
                </a>
            `;
            options = ["Voltar ao início"];
        }

        // --- 2. MENU DE SERVIÇOS ---

        // SITE / WEB
        else if (lowerText.includes("site") || lowerText.includes("loja") || lowerText.includes("landing") || lowerText.includes("web")) {
            reply = "Perfeito. Para web, focamos em velocidade e conversão. Aqui estão nossas soluções rápidas:";
            showServiceCards(catalogo.web);
            // Adicionado "Falar no WhatsApp" conforme solicitado
            options = ["Voltar ao início", "Falar no WhatsApp"];
        } 
        
        // SISTEMAS / APPS
        else if (lowerText.includes("sistema") || lowerText.includes("app") || lowerText.includes("saas") || lowerText.includes("dashboard")) {
            reply = "Entendido. Você precisa de robustez. Trabalhamos com React, Node, Python e SQL. Veja nossas soluções de Sistemas e SaaS:";
            showServiceCards(catalogo.sistemas);
            // Adicionado "Falar no WhatsApp" aqui também
            options = ["Voltar ao início", "Falar no WhatsApp"];
        } 
        
        // AUTOMAÇÃO / IA (Lógica ajustada)
        else if (lowerText.includes("automa") || lowerText.includes("ia") || lowerText.includes("bot") || lowerText.includes("robô")) {
            reply = "Excelente escolha. Automação é o que gera lucro real. Aqui está o que meus 'irmãos' robôs podem fazer por você:";
            showServiceCards(catalogo.automacao);
            // Agora temos a opção específica que leva ao link do Whats
            options = ["Quero um Chatbot", "Falar no WhatsApp", "Voltar ao início"];
        }
        
        // --- 3. OUTROS COMANDOS ---

        // PORTFÓLIO
        else if (lowerText.includes("portfólio") || lowerText.includes("portfolio")) {
            reply = `
                Tenho orgulho do nosso trabalho! 🚀<br>
                Você pode conferir nossos projetos recentes e estudos de caso no link abaixo:
                <br><br>
                <a href="https://kauasilvasos.github.io/portifolio-2026/" 
                   target="_blank" 
                   class="inline-flex items-center bg-blue-600 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded transition-transform hover:scale-105 shadow-md no-underline">
                    <i class="fas fa-external-link-alt mr-2"></i> Acessar Portfólio
                </a>
            `;
            options = ["Voltar ao início", "Falar no WhatsApp"];
        }

        // PREÇO / VALOR
        else if (lowerText.includes("preço") || lowerText.includes("valor") || lowerText.includes("quanto")) {
            reply = "Nossos preços são ultra competitivos. Landing Pages a partir de R$350 e Sistemas a partir de R$2k. Selecione uma categoria:";
            options = ["Ver Sites", "Ver Sistemas", "Ver Automação"];
        }

        // ORÇAMENTO
        else if (lowerText.includes("orçamento")) {
            reply = `
                Para orçamentos personalizados, precisamos entender a fundo sua ideia. 💡<br>
                Vamos conversar diretamente pelo WhatsApp?
                <br><br>
                <a href="https://wa.me/5548985036092?text=Olá, gostaria de um orçamento para meu projeto." 
                   target="_blank" 
                   class="inline-flex items-center bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded transition-transform hover:scale-105 shadow-md no-underline">
                    <i class="fab fa-whatsapp mr-2"></i> Solicitar Orçamento
                </a>
            `;
            options = ["Voltar ao início"];
        }

        // VOLTAR / INÍCIO
        else if (lowerText.includes("voltar") || lowerText.includes("inicio")) {
            reply = "Reiniciando... O que você busca hoje?";
            options = ["Quero um Site/Loja", "Sistema/App Complexo", "Automação & I.A.", "Ver Portfólio"];
        }
        
        // RESPOSTA PADRÃO (HUMAN HANDOFF)
        else {
            reply = `
                Isso sai um pouco da minha programação padrão. 😅<br>
                Mas nosso especialista humano pode te ajudar agora mesmo:
                <br><br>
                <a href="https://wa.me/5548985036092?text=Olá YK, tenho uma dúvida específica." 
                   target="_blank" 
                   class="inline-flex items-center bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded transition-transform hover:scale-105 shadow-md no-underline">
                    <i class="fab fa-whatsapp mr-2"></i> Falar com Humano
                </a>
            `;
            options = ["Voltar ao Menu", "Ver Portfólio"];
        }

        addBotMessage(reply);
        setQuickReplies(options);

    }, 1000);
}


function addUserMessage(text) {
    const div = document.createElement('div');
    div.className = "flex justify-end animate-fade-in";
    div.innerHTML = `<div class="bg-green-600 text-white px-4 py-2 rounded-l-lg rounded-tr-lg max-w-[80%] shadow-lg">${text}</div>`;
    chatBox.appendChild(div);
    scrollToBottom();
}

function addBotMessage(html) {
    const div = document.createElement('div');
    div.className = "flex justify-start animate-fade-in";
    div.innerHTML = `
        <div class="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center mr-2 border border-green-500">
            <i class="fas fa-robot text-green-400 text-sm"></i>
        </div>
        <div class="bg-gray-800 border border-gray-700 text-gray-200 px-4 py-2 rounded-r-lg rounded-tl-lg max-w-[85%] shadow-lg">
            ${html}
        </div>
    `;
    chatBox.appendChild(div);
    scrollToBottom();
}

function showTyping() {
    const div = document.createElement('div');
    div.id = "typing-indicator";
    div.className = "flex justify-start animate-fade-in";
    div.innerHTML = `
        <div class="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center mr-2">
            <i class="fas fa-robot text-gray-500 text-sm"></i>
        </div>
        <div class="bg-gray-800 border border-gray-700 px-4 py-3 rounded-r-lg rounded-tl-lg shadow-lg flex space-x-1">
            <div class="w-2 h-2 bg-gray-500 rounded-full typing-dot"></div>
            <div class="w-2 h-2 bg-gray-500 rounded-full typing-dot"></div>
            <div class="w-2 h-2 bg-gray-500 rounded-full typing-dot"></div>
        </div>
    `;
    chatBox.appendChild(div);
    scrollToBottom();
}

function removeTyping() {
    const indicator = document.getElementById('typing-indicator');
    if (indicator) indicator.remove();
}

function setQuickReplies(options) {
    quickReplies.innerHTML = '';
    options.forEach(opt => {
        const btn = document.createElement('button');
        btn.className = "whitespace-nowrap px-4 py-2 bg-gray-700 hover:bg-green-600 border border-gray-600 hover:border-green-500 rounded-full text-sm transition-colors text-white";
        btn.innerText = opt;
        btn.onclick = () => {
            addUserMessage(opt);
            processBotResponse(opt);
        };
        quickReplies.appendChild(btn);
    });
}

function showServiceCards(servicesList) {
    if (infoPanel) {
        infoPanel.innerHTML = '<h3 class="text-green-400 font-bold mb-4 border-b border-gray-700 pb-2">Catálogo Selecionado:</h3>';
    }
    infoPanel.innerHTML = '<h3 class="text-green-400 font-bold mb-4 border-b border-gray-700 pb-2">Catálogo Selecionado:</h3>';
    
    const cardsContainer = document.createElement('div');
    cardsContainer.className = "grid gap-3 mt-2 mb-2";

    servicesList.forEach(item => {
        // Card HTML
        const cardHTML = `
            <div class="bg-gradient-to-br from-gray-800 to-gray-900 border border-white/5 p-4 rounded-xl hover:border-green-500/30 transition-all duration-300 cursor-pointer group shadow-lg hover:shadow-green-900/10">
                <div class="flex justify-between items-start mb-2">
                    <h4 class="font-bold text-white group-hover:text-green-400 transition-colors text-base">${item.nome}</h4>
                    <span class="text-[10px] font-bold uppercase tracking-wider bg-black/30 border border-white/10 px-2 py-1 rounded text-green-400 shadow-inner">${item.tempo}</span>
                </div>
                
                <p class="text-xs text-blue-300/80 font-mono mb-3 flex items-center gap-1">
                    <i class="fas fa-code text-[10px]"></i> ${item.tech}
                </p>
                
                <p class="text-sm text-gray-400 leading-relaxed border-l-2 border-gray-700 pl-3 mb-3">${item.desc}</p>
                
                <div class="flex justify-between items-center mt-3 pt-3 border-t border-white/5">
                    <span class="text-xs text-gray-500">Investimento a partir de:</span>
                    <span class="font-bold text-green-300 text-lg drop-shadow-sm">${item.preco}</span>
                </div>
            </div>
        `;

        // Adiciona ao Chat
        const chatCardWrapper = document.createElement('div');
        chatCardWrapper.innerHTML = cardHTML;
        cardsContainer.appendChild(chatCardWrapper);
        if (infoPanel) {
            const sideCard = document.createElement('div');
            sideCard.innerHTML = cardHTML;
            infoPanel.appendChild(sideCard);
        }

        // Adiciona ao Painel Lateral
        const sideCard = document.createElement('div');
        sideCard.innerHTML = cardHTML;
        infoPanel.appendChild(sideCard);
    });

    // Adiciona o container de cards ao chat
    const msgDiv = document.createElement('div');
    msgDiv.className = "flex justify-start w-full";
    msgDiv.innerHTML = `
        <div class="w-8 mr-2 flex-shrink-0"></div> <div class="w-full max-w-[90%]">
            ${cardsContainer.innerHTML}
        </div>
    `;
    chatBox.appendChild(msgDiv);
    scrollToBottom();
}

function scrollToBottom() {
    setTimeout(() => {
        chatBox.scrollTop = chatBox.scrollHeight;
    }, 50);
}

// Botão de reinício
document.getElementById('btn-restart').onclick = () => {
    chatBox.innerHTML = '';
    window.onload();
};

userInput.addEventListener('focus', () => {
    setTimeout(() => {
        scrollToBottom();
    }, 300);
});