---
# Leave the homepage title empty to use the site title
title:
date: 2022-10-24
type: landing

sections:
  - block: about.biography
    id: about
    content:
      title: About Me
      # Choose a user profile to display (a folder name within `content/authors/`)
      username: admin
  # - block: features
  #   content:
  #     title: Skills
  #     items:
  #       - name: R
  #         description: 90%
  #         icon: r-project
  #         icon_pack: fab
  #       - name: Statistics
  #         description: 100%
  #         icon: chart-line
  #         icon_pack: fas
  #       - name: Photography
  #         description: 10%
  #         icon: camera-retro
  #         icon_pack: fas
  # - block: experience
  #   content:
  #     title: Experience
  #     # Date format for experience
  #     #   Refer to https://wowchemy.com/docs/customization/#date-format
  #     date_format: Jan 2006
  #     # Experiences.
  #     #   Add/remove as many `experience` items below as you like.
  #     #   Required fields are `title`, `company`, and `date_start`.
  #     #   Leave `date_end` empty if it's your current employer.
  #     #   Begin multi-line descriptions with YAML's `|2-` multi-line prefix.
  #     items:
  #       - title: CEO
  #         company: GenCoin
  #         company_url: ''
  #         company_logo: org-gc
  #         location: California
  #         date_start: '2021-01-01'
  #         date_end: ''
  #         description: |2-
  #             Responsibilities include:

  #             * Analysing
  #             * Modelling
  #             * Deploying
  #       - title: Professor of Semiconductor Physics
  #         company: University X
  #         company_url: ''
  #         company_logo: org-x
  #         location: California
  #         date_start: '2016-01-01'
  #         date_end: '2020-12-31'
  #         description: Taught electronic engineering and researched semiconductor physics.
  #   design:
  #     columns: '2'
  # - block: accomplishments
  #   content:
  #     # Note: `&shy;` is used to add a 'soft' hyphen in a long heading.
  #     title: 'Accomplish&shy;ments'
  #     subtitle:
  #     # Date format: https://wowchemy.com/docs/customization/#date-format
  #     date_format: Jan 2006
  #     # Accomplishments.
  #     #   Add/remove as many `item` blocks below as you like.
  #     #   `title`, `organization`, and `date_start` are the required parameters.
  #     #   Leave other parameters empty if not required.
  #     #   Begin multi-line descriptions with YAML's `|2-` multi-line prefix.
  #     items:
  #       - certificate_url: https://www.coursera.org
  #         date_end: ''
  #         date_start: '2021-01-25'
  #         description: ''
  #         organization: Coursera
  #         organization_url: https://www.coursera.org
  #         title: Neural Networks and Deep Learning
  #         url: ''
  #       - certificate_url: https://www.edx.org
  #         date_end: ''
  #         date_start: '2021-01-01'
  #         description: Formulated informed blockchain models, hypotheses, and use cases.
  #         organization: edX
  #         organization_url: https://www.edx.org
  #         title: Blockchain Fundamentals
  #         url: https://www.edx.org/professional-certificate/uc-berkeleyx-blockchain-fundamentals
  #       - certificate_url: https://www.datacamp.com
  #         date_end: '2020-12-21'
  #         date_start: '2020-07-01'
  #         description: ''
  #         organization: DataCamp
  #         organization_url: https://www.datacamp.com
  #         title: 'Object-Oriented Programming in R'
  #         url: ''
  #   design:
  #     columns: '2'
  # - block: collection
  #   id: posts
  #   content:
  #     title: Recent Posts
  #     subtitle: ''
  #     text: ''
  #     # Choose how many pages you would like to display (0 = all pages)
  #     count: 5
  #     # Filter on criteria
  #     filters:
  #       folders:
  #         - post
  #       author: ""
  #       category: ""
  #       tag: ""
  #       exclude_featured: false
  #       exclude_future: false
  #       exclude_past: false
  #       publication_type: ""
  #     # Choose how many pages you would like to offset by
  #     offset: 0
  #     # Page order: descending (desc) or ascending (asc) date.
  #     order: desc
  #   design:
  #     # Choose a layout view
  #     view: compact
  #     columns: '2'
  # - block: portfolio
  #   id: projects
  #   content:
  #     title: Projects
  #     filters:
  #       folders:
  #         - project
  #     # Default filter index (e.g. 0 corresponds to the first `filter_button` instance below).
  #     default_button_index: 0
  #     # Filter toolbar (optional).
  #     # Add or remove as many filters (`filter_button` instances) as you like.
  #     # To show all items, set `tag` to "*".
  #     # To filter by a specific tag, set `tag` to an existing tag name.
  #     # To remove the toolbar, delete the entire `filter_button` block.
  #     buttons:
  #       - name: All
  #         tag: '*'
  #       - name: Deep Learning
  #         tag: Deep Learning
  #       - name: Other
  #         tag: Demo
  #   design:
  #     # Choose how many columns the section has. Valid values: '1' or '2'.
  #     columns: '1'
  #     view: showcase
  #     # For Showcase view, flip alternate rows?
  #     flip_alt_rows: false
  - block: markdown
    id: timeline
    content:
      title: Timeline
      text: |-
        - **April 3rd '25**: Gave a developer talk at [TT-DevDay](https://tenstorrent.com/en/developer-day) on [improving the programming model](https://docs.google.com/presentation/d/1dpgrF7BHMxQxKwdczNYnVRSdghCqZ70wpTq-kProDpg/edit?usp=sharing) of Tenstorrent AI accelerators.
        - **Sep '24**: Started my PhD at UW!
        - **Feb 7-9th '24**: Attended [Vulkanised 2024](https://vulkan.org/events/vulkanised-2024#agenda) where Devon McKee gave [a presentation](https://www.youtube.com/watch?v=VaE_uKPfjv0) on work I partially collaborated on.
        - **Jan '24 - Aug '24**: Worked as a Junior Specialist at UCSC, leading work on the [Ecoscape project](https://ecoscape-earth.github.io/), a tool to visualize and model the habitat connectivity of birds in order to help inform conservation and climate efforts.
        - **Dec '23 - Jan '24**: Completed a winternship at [Trail of Bits](https://www.trailofbits.com/) with Tyler Sorensen, where I investigated security vulnerabilties of multi-tenant GPU systems.
        - **Apr '23 - Sep '23**: Participated in research as an undergrad at the Concurrency and Heterogenous Programming Lab ([CHPL](https://github.com/ucsc-chpl)) at UCSC. 
          - Significantly contributed to [Epiphron](https://github.com/ucsc-chpl/epiphron), a portable benchmark suite studying fine-grained synchronization and dynamic work allocation on GPUs.
    design: 
      columns: '2'

  - block: markdown
    id: gallery
    content:
      title: Gallery
      subtitle: "Cool stuff I've made"
      text: |-
        {{< gallery album="demo" >}}
    design:
      columns: '1'
  # - block: collection
  #   id: featured
  #   content:
  #     title: Featured Publications
  #     filters:
  #       folders:
  #         - publication
  #       featured_only: true
    # design:
    #   columns: '2'
    #   view: card
  # - block: collection
  #   content:
  #     title: Recent Publications
  #     text: |-
  #       {{% callout note %}}
  #       Quickly discover relevant content by [filtering publications](./publication/).
  #       {{% /callout %}}
  #     filters:
  #       folders:
  #         - publication
  #       exclude_featured: true
  #   design:
  #     columns: '2'
  #     view: citation
  # - block: collection
  #   id: talks
  #   content:
  #     title: Recent & Upcoming Talks
  #     filters:
  #       folders:
  #         - event
  #   design:
  #     columns: '2'
  #     view: compact
  # - block: tag_cloud
  #   content:
  #     title: Popular Topics
  #   design:
  #     columns: '2'
  - block: contact
    id: contact
    content:
      title: Contact
      subtitle:
      text: |-
        Feel free to reach out:
      # Contact (add or remove contact options as necessary)
      email: ssiddens@cs.washington.edu
      # phone: 1-(805)-390-0976
      # appointment_url: 'https://calendly.com'
      # address:
      #   street: 450 Serra Mall
      #   city: Stanford
      #   region: CA
      #   postcode: '94305'
      #   country: United States
      #   country_code: US
      # directions: Enter Building 1 and take the stairs to Office 200 on Floor 2
      # office_hours:
      #   - 'Monday 10:00 to 13:00'
      #   - 'Wednesday 09:00 to 10:00'
      contact_links:
        - icon: twitter
          icon_pack: fab
          name: DM Me
          link: 'https://twitter.com/SeanSiddens'
        # - icon: skype
        #   icon_pack: fab
        #   name: Skype Me
        #   link: 'skype:echo123?call'
        # - icon: video
        #   icon_pack: fas
        #   name: Zoom Me
        #   link: 'https://zoom.com'
      # Automatically link email and phone or display as text?
      autolink: true
      # Email form provider
      # form:
      #   provider: netlify
      #   formspree:
      #     id:
      #   netlify:
      #     # Enable CAPTCHA challenge to reduce spam?
      #     captcha: false
    design:
      columns: '2'

gallery_item:
- album: demo
  image: aa_littlewood_fractal_small.png
  caption: Density plot of eigenvaules of the companion matrices of degree 23 Littlewood polynomials. [{{< icon name="github" pack="fab" >}}](https://github.com/seansiddens/BohemianMatrices)
- album: demo
  image: ba_beta_small.png
  caption: Density plot of eigenvalues of a random sample of matrices whose entries lie in the beta distribution. [{{< icon name="github" pack="fab" >}}](https://github.com/seansiddens/BohemianMatrices)
- album: demo
  image: ca_pathtrace_forest.png
  caption: A rendering from my CPU path tracer written in C. Scene is solely illuminated from image-based-illumination (IBL) by the HDRI sky-box. [{{< icon name="github" pack="fab" >}}](https://github.com/seansiddens/PathTracer)
- album: demo
  image: da_triangle_chaos_game_small.png
  caption: Attractor of a linear iterated function system. Created by following the chaos game. [{{< icon name="github" pack="fab" >}}](https://gist.github.com/seansiddens/3b8d41e5d013acbff96489f170eb81db)
- album: demo
  image: ea_random_walkers.gif
  caption: Simulation of random walkers using compute shaders.
- album: demo
  image: fa_random_scene.png
  caption: A rendering from my CPU path tracer. Code adapted from Peter Shirley\'s Ray Tracing Weekend book series.[{{< icon name="github" pack="fab" >}}](https://github.com/seansiddens/PathTracer)
- album: demo
  image: ga_mandelbrot+julia.gif
  caption: Exploring the relationship between Mandelbrot and Julia sets. Made in [Shadertoy](https://www.shadertoy.com/view/3tyyz3).
- album: demo
  image: ha_newton_fractal.png
  caption: Newton fractal created by applying Newton's method to a complex-valued function. [{{< icon name="github" pack="fab" >}}](https://github.com/seansiddens/NewtonFractals)
- album: demo
  image: ia_dark_scene.png
  caption: A rendering from my CPU path tracer. Scene is illuminated by an emmisive sphere. [{{< icon name="github" pack="fab" >}}](https://github.com/seansiddens/Pathtracer)
- album: demo
  image: ja_DLA_colors.gif
  caption: Diffusion limited aggregation simulation with compute shaders.[{{< icon name="github" pack="fab" >}}](https://github.com/seansiddens/DLA)
- album: demo
  image: ka_eigenvalue_rotation.gif
  caption: Rotating the matrice distribution. [{{< icon name="github" pack="fab" >}}](https://github.com/seansiddens/BohemianMatrices)
- album: demo
  image: la_julia_rotate.gif 
  caption: Julia sets for values rotated along the unit circle on the complex plane. Made in [Shadertoy](https://www.shadertoy.com/view/3tyyz3).
- album: demo
  image: ma_julia_tile.gif
  caption: Tiled Julia sets forming the Mandelbrot set. Made in [Shadertoy](https://www.shadertoy.com/view/3tyyz3).
- album: demo
  image: na_littlewood_zoom.png 
  caption: Zoomed in region of littlewood fractal. [{{< icon name="github" pack="fab" >}}](https://github.com/seansiddens/BohemianMatrices)
- album: demo
  image: oa_sierpinski_chaos_game.png
  caption: Attractor of a linear iterated function system. Created by following the chaos game. [{{< icon name="github" pack="fab" >}}](https://gist.github.com/seansiddens/3b8d41e5d013acbff96489f170eb81db)
- album: demo
  image: pa_mandelbrot_small.png
  caption: Rendering of the Mandelbrot set using the escape time iteration coloring algorithm. [{{< icon name="github" pack="fab" >}}](https://github.com/seansiddens/Mandelbrot)
- album: demo
  image: qa_slimy.gif 
  caption: Slime mold simulation. [{{< icon name="github" pack="fab" >}}](https://github.com/seansiddens/PhysarumSim)
- album: demo
  image: ra_sphere_cube.gif
  caption: Sphere inside a rotating cube. Rendered from scratch using 3D points and a perspective transformation matrix.
- album: demo
  image: sa_tridiagonal_small.png
  caption: Density plot of eignevalues of tridiagonal matrices. [{{< icon name="github" pack="fab" >}}](https://github.com/seansiddens/BohemianMatrices)
- album: demo
  image: buddhabrot.png 
  caption: Technique of rendering the Mandelbrot set, called the [Buddhabrot](https://superliminal.com/fractals/bbrot/). [{{< icon name="github" pack="fab" >}}](https://github.com/seansiddens/Mandelbrot)
---