function showToast(message, type = 'success') {
            const container = document.getElementById('toastContainer');
            const toast = document.createElement('div');
            toast.className = `custom-toast ${type}`;
            
            const icon = type === 'success' ? '<i class="bi bi-check-circle-fill text-success"></i>' : '<i class="bi bi-exclamation-circle-fill text-danger"></i>';
            
            toast.innerHTML = `${icon} <span>${message}</span>`;
            
            container.appendChild(toast);
            
            // Trigger animation
            setTimeout(() => toast.classList.add('show'), 100);
            
            // Remove after 3 seconds
            setTimeout(() => {
                toast.classList.remove('show');
                setTimeout(() => toast.remove(), 300);
            }, 3000);
        }

        // --- 2. Blog Logic (LocalStorage) ---
        let titleInput = document.getElementById("titeltext");
        let blogTextInput = document.getElementById("blogtext");
        let blogDataContainer = document.getElementById("blogData");
        let editIndex = null;
        let blogModalInstance;

        // Initialize Modal
        document.addEventListener('DOMContentLoaded', () => {
            const modalEl = document.getElementById('blogModal');
            blogModalInstance = new bootstrap.Modal(modalEl);
            loadBlogs();
            setupScrollAnimation();
        });

        function addBlog() {
            if (!titleInput.value || !blogTextInput.value) {
                showToast("Please fill in both fields", "danger");
                return;
            }

            let data = JSON.parse(localStorage.getItem("myBlogs")) || [];
            data.push({ 'title': titleInput.value, 'blogtext': blogTextInput.value, 'date': new Date().toLocaleDateString() });
            localStorage.setItem("myBlogs", JSON.stringify(data));

            blogModalInstance.hide();
            showToast("Blog posted successfully!");
            clearForm();
            loadBlogs();
        }

        function loadBlogs() {
            let data = JSON.parse(localStorage.getItem("myBlogs")) || [];
            blogDataContainer.innerHTML = "";

            if (data.length === 0) {
                blogDataContainer.innerHTML = `<div class="col-12 text-center text-secondary py-5"><p>No blogs yet. Click "+ Add New Blog" to start.</p></div>`;
                return;
            }

            data.forEach((blog, index) => {
                blogDataContainer.innerHTML += `
                    <div class="col-md-6 col-lg-4">
                        <div class="card h-100 blog-card border-0 shadow-sm" style="background: var(--bg-card);">
                            <div class="card-body p-4">
                                <div class="d-flex justify-content-between align-items-start mb-2">
                                    <h5 class="card-title fw-bold text-info text-truncate" style="max-width: 70%;">${blog.title}</h5>
                                    <small class="text-secondary" style="font-size: 0.8rem;">${blog.date || ''}</small>
                                </div>
                                <p class="card-text text-secondary small" style="display: -webkit-box; -webkit-line-clamp: 4; -webkit-box-orient: vertical; overflow: hidden;">${blog.blogtext}</p>
                                <div class="mt-3 pt-3 border-top border-secondary d-flex gap-2">
                                    <button onclick="editBlog(${index})" class="btn btn-sm btn-outline-success flex-grow-1"><i class="bi bi-pencil-square"></i> Edit</button>
                                    <button onclick="deleteBlog(${index})" class="btn btn-sm btn-outline-danger flex-grow-1"><i class="bi bi-trash"></i> Delete</button>
                                </div>
                            </div>
                        </div>
                    </div>
                `;
            });
        }

        function deleteBlog(index) {
            if(confirm("Are you sure you want to delete this blog?")) {
                let data = JSON.parse(localStorage.getItem("myBlogs")) || [];
                data.splice(index, 1);
                localStorage.setItem("myBlogs", JSON.stringify(data));
                showToast("Blog deleted successfully", "danger");
                loadBlogs();
            }
        }

        function editBlog(index) {
            let data = JSON.parse(localStorage.getItem("myBlogs")) || [];
            editIndex = index;
            titleInput.value = data[index].title;
            blogTextInput.value = data[index].blogtext;
            
            document.getElementById("updateb").style.display = "inline-block";
            document.getElementById("addb").style.display = "none";
            
            blogModalInstance.show();
        }

        function updateBlog() {
            if (!titleInput.value || !blogTextInput.value) {
                showToast("Fields cannot be empty", "danger");
                return;
            }

            let data = JSON.parse(localStorage.getItem("myBlogs")) || [];
            data[editIndex] = { 'title': titleInput.value, 'blogtext': blogTextInput.value, 'date': data[editIndex].date };
            localStorage.setItem("myBlogs", JSON.stringify(data));

            blogModalInstance.hide();
            showToast("Blog updated successfully!");
            
            document.getElementById("updateb").style.display = "none";
            document.getElementById("addb").style.display = "inline-block";
            clearForm();
            loadBlogs();
        }

        function clearForm() {
            titleInput.value = "";
            blogTextInput.value = "";
            editIndex = null;
            document.getElementById("updateb").style.display = "none";
            document.getElementById("addb").style.display = "inline-block";
        }

        // --- 3. Scroll Animation (Fade In) ---
        function setupScrollAnimation() {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('is-visible');
                    }
                });
            }, { threshold: 0.1 });

            document.querySelectorAll('.fade-in-section').forEach(section => {
                observer.observe(section);
            });
        }

        // --- 4. CV Download Mock ---
        function downloadCV() {
            // Replace this link with your actual PDF path
            window.location.href = "image/Anand Kumarr Resume.pdf";
            showToast("CV download started...", "success");
            console.log("Downloading CV...");
        }

        // --- 5. Contact Form Handling ---
        function handleContactSubmit(e) {
            e.preventDefault();
            const btn = e.target.querySelector('button');
            const originalText = btn.innerHTML;
            
            btn.disabled = true;
            btn.innerHTML = '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Sending...';
            
            // Simulate server delay
            setTimeout(() => {
                showToast("Message Not sent ", "faield");
                e.target.reset();
                btn.disabled = false;
                btn.innerHTML = originalText;
            }, 1500);
        }