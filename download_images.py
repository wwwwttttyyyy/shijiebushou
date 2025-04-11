import os
import urllib.request
import ssl

# 创建images目录（如果不存在）
os.makedirs('images', exist_ok=True)

# 创建子目录
for subdir in ['stars']:
    os.makedirs(os.path.join('images', subdir), exist_ok=True)

# 禁用SSL证书验证（仅用于示例）
ssl._create_default_https_context = ssl._create_unverified_context

# 图片URL列表
image_urls = {
    # 烟花图片
    'images/hero-fireworks.jpg': 'https://images.unsplash.com/photo-1498931299472-f7a63a5a1cfa?w=1200',
    'images/fireworks1.jpg': 'https://images.unsplash.com/photo-1467810563316-b5476525c0f9?w=800',
    'images/fireworks2.jpg': 'https://images.unsplash.com/photo-1576404425771-9a5d5a73c2f4?w=800',
    'images/fireworks3.jpg': 'https://images.unsplash.com/photo-1533230408708-8f9f91d1235a?w=800',
    'images/fireworks4.jpg': 'https://images.unsplash.com/photo-1552410260-0fd9b577afa6?w=800',
    'images/fireworks5.jpg': 'https://images.unsplash.com/photo-1576401142235-6c2a985a9828?w=800',
    
    # 人物图片
    'images/portrait1.jpg': 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=800',
    'images/portrait2.jpg': 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=800',
    'images/portrait3.jpg': 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800',
    'images/portrait4.jpg': 'https://images.unsplash.com/photo-1552374196-c4e7ffc6e126?w=800',
    
    # 风景图片
    'images/landscape1.jpg': 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800',
    'images/landscape2.jpg': 'https://images.unsplash.com/photo-1511884642898-4c92249e20b6?w=800',
    
    # 抽象图片
    'images/abstract1.jpg': 'https://images.unsplash.com/photo-1541701494587-cb58502866ab?w=800',
    
    # 分类图片
    'images/category-fireworks.jpg': 'https://images.unsplash.com/photo-1468276311594-df7cb65d8df6?w=800',
    'images/category-portrait.jpg': 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=800',
    'images/category-landscape.jpg': 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=800',
    'images/category-abstract.jpg': 'https://images.unsplash.com/photo-1507908708918-778587c9e563?w=800',
    
    # 关于我们图片
    'images/about-image.jpg': 'https://images.unsplash.com/photo-1542038784456-1ea8e935640e?w=800',
    
    # 星空背景
    'images/stars.png': 'https://raw.githubusercontent.com/VincentGarreau/particles.js/master/demo/particles.js-master/img/stars.png',
    'images/stars2.png': 'https://raw.githubusercontent.com/VincentGarreau/particles.js/master/demo/particles.js-master/img/stars2.png',
    'images/stars3.png': 'https://raw.githubusercontent.com/VincentGarreau/particles.js/master/demo/particles.js-master/img/stars3.png'
}

# 下载图片
for local_path, url in image_urls.items():
    try:
        print(f"下载 {url} 到 {local_path}")
        urllib.request.urlretrieve(url, local_path)
        print(f"成功下载 {local_path}")
    except Exception as e:
        print(f"下载 {local_path} 失败: {e}")

print("图片下载完成！") 