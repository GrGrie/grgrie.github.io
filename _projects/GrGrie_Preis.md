---
layout: page
title: GrGrie_Preis
description: Discounter website scraper, classifier and price tracker
img: assets/img/german-discounters.png
importance: 1
category: Personal
related_publications: true
---



<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/GrGrie_Preis/original_page.jpg" title="Raw flyer page" class="img-fluid rounded z-depth-1" %}
    </div>
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/GrGrie_Preis/yolo_detection_example.jpg" title="YOLO detections on flyer" class="img-fluid rounded z-depth-1" %}
    </div>
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/GrGrie_Preis/crop_example.jpg" title="Exported product crop" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    Left: a scraped weekly flyer page. Middle: the same page with detection boxes for products, prices and discounts. 
    Right: the automatically exported crops used later for OCR and downstream analysis.
</div>
<!--
<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/web-ui-run-overview.jpg" title="FastAPI web UI run overview" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    The FastAPI web interface shows recent runs, detected items and links to crops and metadata for quick inspection.
</div>
-->

Selenium scrapes the current week’s PDF or HTML flyers, the pages are rendered to JPEG, YOLOv11 runs detection on each page, and all crops plus metadata are stored in a time-stamped run folder. Then PaddleOCR extracts text from product and price crops, and a simple rule-based classifier assigns product categories. Finally, all data is sent via Telegram Bot for further usage and analysis.