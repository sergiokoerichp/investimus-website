/**
 * Forms Module
 * Handles form validation, submission and phone formatting
 */

class Forms {
    constructor() {
        this.init();
    }

    init() {
        this.setupFormValidation();
        this.setupPhoneFormatting();
        this.setupFAQToggle();
    }

    setupFormValidation() {
        document.querySelectorAll('form').forEach(form => {
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleFormSubmission(form);
            });
        });
    }

    handleFormSubmission(form) {
        // Coleta dados do formulário
        const formData = new FormData(form);
        const data = Object.fromEntries(formData);

        // Simula envio bem-sucedido
        const submitButton = form.querySelector('button[type="submit"]');
        if (submitButton) {
            const originalText = submitButton.textContent;
            const originalBg = submitButton.className;

            // Feedback visual de sucesso
            submitButton.textContent = '✓ Enviado com sucesso!';
            submitButton.className = originalBg.replace('from-blue-600 to-blue-700', 'from-green-600 to-green-700');
            submitButton.disabled = true;

            // Mostra mensagem de sucesso
            this.showSuccessMessage(form);

            // Limpa formulário após 3 segundos
            setTimeout(() => {
                form.reset();
                submitButton.textContent = originalText;
                submitButton.className = originalBg;
                submitButton.disabled = false;
                this.removeSuccessMessage(form);
            }, 3000);
        }

        // Log para desenvolvimento (remover em produção)
        console.log('Dados do formulário:', data);

        // Aqui você pode integrar com um serviço de email real
        // this.sendToEmailService(data);
    }

    showSuccessMessage(form) {
        const successDiv = document.createElement('div');
        successDiv.className = 'success-message mt-4 p-4 bg-green-50 border border-green-200 rounded-lg text-green-800 animate-fadeInUp';
        successDiv.innerHTML = '<strong>Sucesso!</strong> Recebemos seu contato e retornaremos em breve.';
        form.appendChild(successDiv);
    }

    removeSuccessMessage(form) {
        const successMessage = form.querySelector('.success-message');
        if (successMessage) {
            successMessage.remove();
        }
    }

    setupPhoneFormatting() {
        document.querySelectorAll('input[type="tel"]').forEach(input => {
            input.addEventListener('input', (e) => {
                let value = e.target.value.replace(/\\D/g, '');
                if (value.length <= 11) {
                    if (value.length > 6) {
                        value = value.replace(/(\\d{2})(\\d{4,5})(\\d{0,4})/, '($1) $2-$3');
                    } else if (value.length > 2) {
                        value = value.replace(/(\\d{2})(\\d{0,5})/, '($1) $2');
                    }
                    e.target.value = value;
                }
            });
        });
    }

    setupFAQToggle() {
        // FAQ Toggle function (global scope for onclick handlers)
        window.toggleFAQ = (id) => {
            const answer = document.getElementById("answer" + id);
            const icon = document.getElementById("icon" + id);
            if (answer && icon) {
                answer.classList.toggle("hidden");
                icon.classList.toggle("rotate-180");
            }
        };
    }

    // Method to send data to email service (placeholder)
    async sendToEmailService(data) {
        try {
            // Exemplo de integração com serviço de email
            // const response = await fetch('/api/contact', {
            //     method: 'POST',
            //     headers: {
            //         'Content-Type': 'application/json',
            //     },
            //     body: JSON.stringify(data)
            // });
            // return response.json();
            console.log('Dados enviados:', data);
        } catch (error) {
            console.error('Erro ao enviar formulário:', error);
        }
    }
}

// Export for module use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = Forms;
}