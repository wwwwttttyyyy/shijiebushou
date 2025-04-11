document.addEventListener('DOMContentLoaded', () => {
    // 页面加载完成后隐藏预加载动画
    const preloader = document.querySelector('.preloader');
    setTimeout(() => {
        preloader.style.opacity = '0';
        setTimeout(() => {
            preloader.style.display = 'none';
        }, 500);
    }, 1000);

    // 导航栏滚动效果
    const header = document.querySelector('header');
    const backToTop = document.querySelector('.back-to-top');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            header.classList.add('sticky');
            backToTop.classList.add('active');
        } else {
            header.classList.remove('sticky');
            backToTop.classList.remove('active');
        }
    });

    // 移动端菜单
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('nav');
    
    menuToggle.addEventListener('click', () => {
        nav.classList.toggle('active');
    });

    // 点击导航链接关闭菜单
    const navLinks = document.querySelectorAll('nav ul li a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            nav.classList.remove('active');
        });
    });

    // 平滑滚动
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            if (!this.classList.contains('category-link')) { // 排除分类链接，因为它们有特殊处理
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // 作品集筛选
    const filterButtons = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');
    const loadMoreBtn = document.querySelector('.gallery-load-more .btn');
    let isAllLoaded = false;
    
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const filter = button.getAttribute('data-filter');
            
            // 更新按钮状态
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            // 筛选作品
            galleryItems.forEach(item => {
                if (filter === 'all') {
                    // 如果已经点击过"加载更多"，显示所有作品
                    if (isAllLoaded) {
                        item.classList.add('show');
                    } else {
                        // 否则只显示初始作品
                        if (item.classList.contains('initial-show')) {
                            item.classList.add('show');
                        } else {
                            item.classList.remove('show');
                        }
                    }
                } else {
                    if (item.classList.contains(filter)) {
                        if (isAllLoaded || item.classList.contains('initial-show')) {
                            item.classList.add('show');
                        } else {
                            item.classList.remove('show');
                        }
                    } else {
                        item.classList.remove('show');
                    }
                }
            });
        });
    });

    // 加载更多功能
    loadMoreBtn.addEventListener('click', function() {
        isAllLoaded = true;
        
        // 获取当前激活的筛选类别
        const activeFilter = document.querySelector('.filter-btn.active').getAttribute('data-filter');
        
        // 显示所有对应类别的作品
        galleryItems.forEach(item => {
            if (activeFilter === 'all' || item.classList.contains(activeFilter)) {
                item.classList.add('show');
            }
        });

        // 使用 setTimeout 创建逐个显示的动画效果
        let delay = 0;
        galleryItems.forEach(item => {
            if (item.classList.contains('show') && !item.classList.contains('initial-show')) {
                setTimeout(() => {
                    item.style.opacity = '1';
                    item.style.transform = 'translateY(0)';
                }, delay);
                delay += 100;
            }
        });

        // 隐藏加载更多按钮
        this.style.display = 'none';
    });

    // 初始化显示
    document.querySelector('.filter-btn[data-filter="all"]').click();

    // 图片查看器
    const lightbox = document.querySelector('.lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxCaption = document.querySelector('.lightbox-caption');
    const closeLightbox = document.querySelector('.close-lightbox');
    
    // 打开图片查看器
    document.querySelectorAll('.zoom').forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            
            const imgSrc = this.getAttribute('href');
            const imgAlt = this.closest('.gallery-item').querySelector('img').getAttribute('alt');
            
            lightboxImg.src = imgSrc;
            lightboxCaption.textContent = imgAlt;
            lightbox.style.display = 'block';
            
            // 禁止滚动
            document.body.style.overflow = 'hidden';
        });
    });
    
    // 关闭图片查看器
    closeLightbox.addEventListener('click', () => {
        lightbox.style.display = 'none';
        document.body.style.overflow = 'auto';
    });
    
    // 点击空白处关闭图片查看器
    lightbox.addEventListener('click', function(e) {
        if (e.target === this) {
            lightbox.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });

    // 滚动动画
    const animateOnScroll = () => {
        const elements = document.querySelectorAll('.gallery-item, .category-card, .featured-item');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.2;
            
            if (elementPosition < screenPosition) {
                element.classList.add('animate');
            }
        });
    };
    
    // 初始检查
    animateOnScroll();
    
    // 滚动时检查
    window.addEventListener('scroll', animateOnScroll);

    // 表单提交
    const contactForm = document.querySelector('.contact-form form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            const formMessage = document.getElementById('formMessage');
            const submitButton = this.querySelector('button[type="submit"]');
            
            // 获取表单数据
            const formData = {
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                subject: document.getElementById('subject').value,
                message: document.getElementById('message').value
            };

            try {
                submitButton.disabled = true;
                submitButton.textContent = '发送中...';
                formMessage.textContent = '';

                const response = await fetch('http://localhost:3000/api/send-email', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(formData)
                });

                const result = await response.json();

                if (result.success) {
                    formMessage.textContent = '邮件发送成功！';
                    formMessage.style.color = 'green';
                    this.reset(); // 清空表单
                } else {
                    throw new Error(result.message);
                }
            } catch (error) {
                formMessage.textContent = '发送失败，请稍后重试';
                formMessage.style.color = 'red';
            } finally {
                submitButton.disabled = false;
                submitButton.textContent = '发送留言';
            }
        });
    }

    // 订阅表单
    const newsletterForm = document.querySelector('.footer-newsletter form');
    
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = this.querySelector('input[type="email"]').value;
            
            if (email) {
                alert(`感谢订阅！我们会将最新消息发送到: ${email}`);
                this.reset();
            }
        });
    }

    // 获取所有分类链接
    const categoryLinks = document.querySelectorAll('.category-link');
    
    // 为每个分类链接添加点击事件
    categoryLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // 获取目标分类
            const targetFilter = this.getAttribute('data-filter');
            
            // 滚动到作品集区域
            document.querySelector('#gallery').scrollIntoView({
                behavior: 'smooth'
            });
            
            // 等待滚动完成后激活对应的筛选按钮
            setTimeout(() => {
                // 找到对应的筛选按钮
                const filterBtn = document.querySelector(`.filter-btn[data-filter="${targetFilter}"]`);
                if (filterBtn) {
                    // 移除所有按钮的active类
                    document.querySelectorAll('.filter-btn').forEach(btn => {
                        btn.classList.remove('active');
                    });
                    
                    // 添加active类到目标按钮
                    filterBtn.classList.add('active');
                    
                    // 筛选作品
                    const items = document.querySelectorAll('.gallery-item');
                    items.forEach(item => {
                        if (item.classList.contains(targetFilter)) {
                            item.style.display = 'block';
                        } else {
                            item.style.display = 'none';
                        }
                    });
                }
            }, 500); // 给滚动一些时间
        });
    });

    const heart = document.querySelector('.heart');

    // 可以在这里添加事件监听器来控制心跳动画
    heart.addEventListener('click', function() {
        if (heart.style.animation) {
            heart.style.animation = '';
        } else {
            heart.style.animation = 'heartbeat 1s infinite';
        }
    });
}); 