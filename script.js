// Instancia os ícones vetoriais modernos do Lucide
lucide.createIcons();

// Função interativa: Copiar o código de exemplo ao clicar (Múltiplos botões suportados)
const copyBtns = document.querySelectorAll('.copy-btn');

copyBtns.forEach(btn => {
    btn.addEventListener('click', function() {
        // Encontra o bloco de código que pertence a este botão
        const block = this.closest('.code-example') || this.closest('.prompt-maker');
        if(!block) return;
        const codeText = block.querySelector('code').innerText;
        
        // Joga pra área de transferência do usuário (Ctrl+C)
        navigator.clipboard.writeText(codeText).then(() => {
            const originalHTML = this.innerHTML;
            
            // Reação visual instantânea de sucesso
            this.innerHTML = '<i data-lucide="check" style="color: #000;"></i> Copiado!';
            this.style.color = ''; // Mantém a cor original do text
            this.style.transform = 'scale(1.05)';
            lucide.createIcons();
            
            // Volta ao normal após 2 segundos
            setTimeout(() => {
                this.innerHTML = originalHTML;
                this.style.transform = 'none';
                lucide.createIcons();
            }, 2000);
        });
    });
});

// Lógica de "Fazedor de Prompts" (Modo Guiado)
const pmType = document.getElementById('pm-type');
const pmStyle = document.getElementById('pm-style');
const pmTone = document.getElementById('pm-tone');
const pmOutput = document.getElementById('pm-output');

function generatePrompt() {
    if(!pmType || !pmStyle || !pmTone || !pmOutput) return;
    
    const tipo = pmType.value;
    const estilo = pmStyle.value;
    const tom = pmTone.value;
    
    let base = `Construa um(a) **${tipo}**.`;
    let visual = `Identidade visual e Design: **Quero estilo ${estilo}**.`;
    let copyText = `Quando você inventar os textos da página (Copy de vendas), utilize um tom **${tom}** para fisgar o público.`;
    
    let extra = "";
    if(tipo.includes("Apple")) {
        extra = "\n\nO BÔNUS MAESTRIA: Eu exijo que você use a biblioteca GSAP para animar e dar movimento e flow na tela conforme eu faço scroll na página. Faça o famoso Efeito Vidro nas caixas.";
    } else if(tipo.includes("SaaS")) {
        extra = "\n\nO BÔNUS SISTEMA: Escreva Javascript para simular os cliques do painel, os inputs e faça até mesmo senhas falsas baterem pra dar a ilusão de um programa vivo (Fake Data).";
    } else if(tipo.includes("Dashboard")) {
        extra = "\n\nO BÔNUS: Inclua dezenas de tabelas organizadas e incorpore gráficos visualmente ultra luxuosos que pareçam um painel da bolsa de valores.";
    }
    
    // Concatena a obra de arte
    const promptOficial = `"Antigravity, ative o Modo Executor Web. 🚀\n\n${base}\n${visual}\n${copyText}${extra}\n\nTermine e abra tudo no meu navegador quando estiver pronto!"`;
    
    pmOutput.innerText = promptOficial;
}

// Inicia escutadores da tela para rodar em tempo real
if(pmType && pmStyle && pmTone) {
    pmType.addEventListener('change', generatePrompt);
    pmStyle.addEventListener('change', generatePrompt);
    pmTone.addEventListener('change', generatePrompt);
    
    // Geração na hora que abre a página
    generatePrompt();
}

// Lógica de "Single Page Application": Smooth Scroll e Active State da Sidebar
const navLinks = document.querySelectorAll('.nav-menu a');

navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        
        // Limpa a marcação de 'ativo' de todos os links do menu
        navLinks.forEach(l => l.classList.remove('active'));
        
        // Marca o link clicado como ativo
        this.classList.add('active');
        
        // Troca de Abas (Modo SPA)
        const targetSectionId = this.getAttribute('href').substring(1);
        
        // Esconde todas as seções
        document.querySelectorAll('.doc-section').forEach(sec => {
            sec.classList.remove('active-section');
        });
        
        // Exibe apenas a seção clicada e volta tela ao topo
        const targetSection = document.getElementById(targetSectionId);
        if (targetSection) {
            targetSection.classList.add('active-section');
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    });
});
