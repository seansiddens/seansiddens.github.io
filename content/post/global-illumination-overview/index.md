---
# Documentation: https://wowchemy.com/docs/managing-content/

title: "Computing Photorealistic Images: An Overview of Monte Carlo Global Illumination Algorithms"
subtitle: ""
summary: "Adapted from my final paper for CSE 185: Introduction to Technical Writing."
authors: [Sean Siddens]
tags: []
categories: []
date: 2023-09-21T19:27:48-07:00
lastmod: 2023-09-21T19:27:48-07:00
featured: false
draft: false

# Featured image
# To use, add an image named `featured.jpg/png` to your page's folder.
# Focal points: Smart, Center, TopLeft, Top, TopRight, Left, Right, BottomLeft, Bottom, BottomRight.
image:
  caption: "https://github.com/mmp/pbrt-v4-scenes"
  focal_point: ""
  preview_only: false

# Projects (optional).
#   Associate this post with one or more of your projects.
#   Simply enter your project's folder or file name without extension.
#   E.g. `projects = ["internal-project"]` references `content/project/deep-learning/index.md`.
#   Otherwise, set `projects = []`.
projects: []
---

> Note: This blog post is adapted from my [final project](https://www.overleaf.com/read/pdswysmbnmyk) for CSE 185: *Technical Writing for Computer Science and Engineering*. This was not a class on global illumination and my research time was limited to the course of around three to four weeks. Some information here is over-simplified due to both lack of time and knowledge. However, I believe that this post could serve as a good overview for someone new to the topic of global illumination. If there's any information contained here that is incorrect, please let me know :smile: .


# Introduction

Rendering, in the context of computer graphics, is the process of synthesizing a 2D image from a description of a 3D virtual scene.
If an image is produced that is indistinguishable from a photo taken with a *real* camera, then it is called *photorealistic rendering*.

In order to produce such an image, the "underlying physical processes regarding materials and the behavior of light" must be "precisely modeled and simulated" at a significant level of detail [2].
While the nature of light and how it interacts with objects has long been understood in the field of physics, actually simulating this process accurately and efficiently on a computer has been a major focus of research in the computer graphics field for decades.

Despite the extreme challenge, photorealistic rendering has remained such an active research topic in computer graphics because it is an extremely desirable effect for a wide variety of applications.
In the television and film industry, for example, it is utilized for the production of animated features.
Even if the style of the film isn't strictly "photorealistic", oftentimes physically plausible lighting effects are desirable to make the film more immersive and visually impressive. 
Furthermore, an accurate lighting model is necessary for the visual effects industry in order to convincingly combine real and virtual elements into a single shot.
Another important application of photorealistic rendering is in architecture, where indoor and outdoor lighting can be fully simulated under various atmospheric conditions and times of day, allowing architects to better design before actually constructing the building [2].

All of these applications are non-interactive since the actual computational process of rendering oftentimes takes minutes to hours to fully complete.
This is due to the fact that the algorithms used in photorealistic rendering are extremely complex and computationally expensive. 
However, recent advances in hardware and algorithmic techniques have made it possible to achieve near photorealistic results in real-time contexts such as video games.
Achieving photorealistic image synthesis in real-time speeds is a major goal of computer graphics research, since it ushers in the possibility of creating immersive virtual realities nearly indistinguishable from real life.

This paper will explore a class of photorealistic rendering techniques known as *Monte Carlo path tracing* algorithms.
There are other methods which can achieve similar results, but path tracing has proven to be especially effective and efficient, especially as hardware has improved over time.
Furthermore, there has been lots of research, recently and over the past few decades, into these algorithms in order to make them practically usable.
There are other benefits to the path tracing algorithms which will be further discussed, but overall they are proving to be the future of photorealistic rendering in the film and video game industries [1, 3].

# Illumination
## Models of Light
There are multiple ways to model the behavior of light in computer simulations.
Light is dual by it's very nature,  existing simultaneously as both a wave and a stream of particles.
Certain phenomena arise by assuming light adheres to one of these models.
For example, the diffraction and interference effects can be explained by assuming light is a wave, and the photoelectric effect arises from assuming light is a stream of particles [2].


However, simulating a model of light which attempts to capture *every* possible physical phenomenon is unnecessary and extremely inefficient.
The most common model used in computer graphics is called the *geometric* or *ray* model of light [4].
This model can be thought of as a "high level" model since it abstracts away many of the low level details of light and simplifies many assumptions.
For example, the model views light as a ray, only consisting of an origin and a direction. 
Thus, light interacting with a surface is simply viewed as a ray intersecting some other geometric object.
Additionally, it's assumed that light travels at an infinite speed and is not influenced by external effects such as gravity and magnetic fields.
While the geometric model of light disallows the simulation of certain phenomenon such as diffraction and interference, it is often good enough for the purposes of computer graphics and photorealistic rendering. 

{{< figure src="ray-model.png" caption="Typically, **o** and **d** are three-component vectors representing the origin and direction of the ray in three dimensional space." numbered="true" >}}

Another assumption that is sometimes made is that the geometric light ray carries some particular color depending on what objects it has interacted with.
In reality, light has a particular wavelength that materials absorb, thus what remains is perceived as color.
This paper will make the simplifying assumption, with materials having a single color and rays of light transmitting this color after interacting with the material.

## Reflection Models
Before light reaches a camera sensor or the eye, it is first emitted from a light source and then takes some arbitrary path throughout the scene.
This "path" is governed by how light reflects with surfaces.
These reflectance properties are what gives different materials their different appearances [2].

These properties can be described by a function called a *bidrectional reflectance distribution function* (BRDF).
This function assumes light hits a surface at some point $x$ from some direction $\Psi$ and is reflected in some other direction $\Theta$.

{{< figure src="brdf.png" caption="Visualization of the bidirectional reflectance distribution function. Figure credit: [2]" numbered="true" >}}

Given the intersection point, incident, and exitant directions, the function returns the ratio of light reflected to the outgoing direction from the incoming direction.
A material which reflects light equally in all directions is known as a *diffuse* or *Lambertian* material. 
This material will look the same when viewed from all directions, irrespective of where the light is shining from.
Rough surfaces such as dirt, chalk, or unfinished wood will exhibit this property.
A material which reflects light in a single direction (such as a mirror) is known as a *specular* surface.
Figure 3 visually compares the different types of BRDFs and demonstrates how they ultimately describe the ratio of outgoing light to incoming light for any given direction.
In reality, materials are *glossy*, meaning they exhibit a complex combination of diffuse and specular properties. 
Because of this, physically accurate BRDFs are often extremely complicated and cannot be described by simple analytical formulae [2].

{{< figure src="materials.png" caption="isual comparison of different BRDFs. Pure diffuse/Lambertian and pure specular materials are perfect reflectors and don't exist in the real world. A glossy BRDF, such as the one visualized above, more accurately models the behavior of real life materials. Figure credit: [2]" numbered="true" >}}

There have existed many frameworks which use these reflectance models to render images.
Some of the most popular, such as the Phong or Blinn-Phong model, do not attempt to be physically accurate, but instead attempt to approximate the phenomenological appearance of materials [10].
This disregard for physical accuracy also makes these models extremely efficient, and they are often still used today in some capacity for video games.
However, non-physically accurate frameworks fail to capture many of the lighting effects which give an image a photorealistic appearance.

## The Rendering Equation

In order to unify all of the existing rendering frameworks into a single model, the *rendering equation* was introduced in 1986 [5].
This equation is a single mathematical formula which entirely describes the transport of light throughout a scene:

$$
L(x \rightarrow \omega_o) = L_e(x \rightarrow \omega_o) + \int_{\Omega_x}{f(x, \omega_i \rightarrow \omega_o)L_i(x \leftarrow \omega_i)(\omega_i \cdot n)d\omega_i}
$$

Essentially, the equation states that the total amount of light that is  transported from a point $x$ in a direction $\omega_o$ is the sum of the emitted light and the total amount of light which is reflected to $x$ from all other directions on the hemisphere centered above $x$ [5].

The $L_e$ term is the *emmittance term* and accounts for how much light is emitted from the point.
If the equation is being evaluated on a point on a light source, such as a desk lamp or the Sun, this term would be non-zero.
For any other point in the scene, however, this term should be zero.
The other half of the equation integrates over the hemisphere $\Omega_x$, accounting for all of the light contributing to the point $x$ from  all other directions $\omega_i$ on the hemisphere. Figure 4 visualizes this integral and how it relates to the incoming and outgoing directions of light.

{{< figure src="rendering-eq-hemis.png" caption="The rendering equation integrates over all incoming light arriving to the point from other points in the scene. Image credit: [11]" numbered="true" >}}

The first term $f$ inside the integrand is the BRDF mentioned earlier, which determines the ratio of light which contributes to the point from the incoming direction that is reflected to the outgoing direction.

The next term is actually a *recursive call to the rendering equation itself*: 
how much light is coming from *different* directions in the scene needs to be computed.
This recursive call makes the rendering equation extremely challenging to solve.
Analytically computing it is infeasible, and using other approximations can be extremely challenging.
Fundamentally, the process of photorealistic rendering is about computing this integral, and the goal of the algorithms which will be addressed in this paper is to find ways to *estimate* this integral quickly and efficiently.

The final term in the integrand is what is known as the *geometric term*. For two normalized vectors $a$ and $b$ (it is assumed that every vector quantity is normalized), their dot product gives the cosine of the angle between them: 

$$
a \cdot b = cos \theta
$$

The geometric term is the dot product between the incoming light direction and the surface normal. 
This term accounts for how the alignment of these two vectors effects how much light is actually deposited on the surface point from the incoming direction.
As the incoming direction approaches being perpendicular to the surface normal (and therefore *parallel* to the surface), the term approaches zero. 
At glancing angles, light is spread over a larger area, so the actual contribution lessens. 
If the light is parallel to the surface, no light is deposited, and the term should be zero.
If the incoming direction is directly over the surface, then the angle between the surface normal and the direction will be zero, thus the term would be one. 
Intuitively, this term is the reason why midday is the brightest time of day, while sunset and sunrise are the darkest: light at glancing angles to a surface contributes far less than light at a direct angle.

One may notice that the model of how paths of light are traced with the rendering equation is opposite of how they flow in reality: light is followed starting from the camera to the light source.
This model greatly increases the efficiency of the algorithms used to approximate the rendering equation. 
What makes this optimization possible is *Helmholtz' law of reciprocity*, stating that the journey a ray of light and it's *reverse* takes is the same [4]. 
What this means is that the value of the rendering equation is the same whether light is traced starting from the light source or from the camera.

## Global Illumination

The rendering equation encodes all of the behavior of light transport needed to capture many complex lighting phenomenon.
When evaluating the integral of the equation, if the incoming light direction comes directly from a light source, this is known as *direct lighting*.
On the other hand, if this direction comes from another point in the scene which isn't a light source (not intrinsically emitting any light), this light contribution is called *indirect lighting*. 
The combination of these two phenomenon captures the behavior of all types of light scattering throughout a scene, and is called *global illumination* [4].

{{< figure src="gi.png" caption="The different components of lighting: (a) the light source, (b) direct lighting, (c) indirect lighting, (d) all combined (global illumination). Image credit: [1]" numbered="true" >}}

Figure 5 captures the different lighting behaviors. 
Indirect lighting comes from the fact that light often bounces off multiple surfaces before it hits the final surface. 
Without indirect lighting, as figure 5(b) illustrates, points not in direct line of sight with a light source will appear completely black.
Furthermore, in figure 5(d) where all lighting effects have been combined, it can be see that the white walls don't appear 100% white.
This is again due to indirect illumination, where light bouncing off one of the colored walls will hit the white wall, contributing some of it's color to the wall's appearance.

In figure 5(d), one can also see bright highlights inside the shadow of the glass teapot on the right. 
These bright spots are known as *caustics*, and are a result of light travelling from a light source, refracting through a glass object or reflecting off a mirror-like object one or more times, and then hitting a diffuse surface [4]. 
Essentially, multiple rays of light are concentrated to a single point, resulting in brighter spots in the image.

These complex lighting behaviors are why the rendering equation is so powerful. 
Under this framework, one can completely capture these global illumination effects. 
However, as will be explored further, simulating these effects is tremendously hard.
Many real-time video games more closely resemble figure 5(b), since capturing direct lighting is far easier than indirect. 
Oftentimes in video games or even movies these global illumination effects were "faked" using textures or colored light sources, giving the illusion of indirect lighting without actually having to simulate it [4].


# Monte Carlo Methods

In order to construct a computer simulation which evaluates the rendering equation, one needs a strategy for numerical integration.
The most well known method for this is the *Riemann sum*, where the region to be integrated is partitioned into many regular shapes, such as rectangles, and then their aggregate area will be similar to the actual value of the integral [13].

The Riemann sum to evaluate the integral of the function $f$ is defined as:

$$
S = \sum_{i=1}^n f(x_i) \Delta x_i
$$

where *n* is the number of partitions the region has been divided into, and $\Delta x_i$ is the width of one partition. 
The function is sampled at some fixed location within the sub-interval defined by each partition.

The issue with this technique is that if the function of interest  is a two dimensional function (such as the surface integral in the rendering equation), $n^2$ partitions need to be summed to get the same accuracy.
The number of samples needed for the sum will grow exponentially with each dimensional increase.
This is known as the *curse of dimensionality* [13].
For the problem of solving the rendering equation, a numerical integration technique which has the same performance *regardless of dimensionality* is needed.

## Monte Carlo Integration

The solution to this problem is through a class of mathematical techniques called *Monte Carlo methods*.
These are algorithms which use a random process to generate a solution.
These techniques are heavily reliant on probability theory, so a brief review is in order.

For a continuous random variable $x$, the *probability density function* (PDF) $p(x)$ defines the probability the variable will take on some given value [2].
The *expected value* of a random variable can be thought of as the average value the variable would take on over some probability distribution, and is defined as:

$$
E[x] = \int_{-\infty}^\infty x p(x) dx.
$$

The *variance* is the average of how far the random variable deviates from its expected value, and is defined as [2]:

$$
\sigma^2 = E[(x - E[x^2])] = E[x^2] - E[x]^2
$$

The variance is extremely important for measuring the error of these algorithms, and can be a useful metric for comparing their relative performance and efficiency.

Let $I$ be the integral of interest, defined over $[a, b]$:

$$
I = \int_a^b f(x)dx.
$$

The *Monte Carlo estimator* for the integral is defined as

$$
\langle I \rangle = \frac{1}{N} \sum_{i=1}^N \frac{f(x_i)}{p(x_i)}
$$

where each sample $x_i$ is taken from the PDF $p(x)$.
This estimator is considered *unbiased*, since the expected value of the estimator is the actual value of the integral [2].
This means that an extremely accurate estimate of the integral can be acquired as long as a sufficient number of samples are taken.
Furthermore, this strategy does not suffer from the curse of dimensionality.
Regardless of whether the function is one or two dimensional, the same number of samples are required to converge to a good estimate.

The variance of the estimator is 

$$
\sigma^2 = \frac{1}{N} \int (\frac{f(x)}{p(x)} - I)^2p(x)dx.
$$

This demonstrates the one weakness of Monte Carlo integration: the variance decreases only linearly with $N$.
This means that fully removing the error from an estimate can take an extremely large number of samples.

The way Monte Carlo integration is used in the context of photorealistic rendering is for giving an estimate of the rendering equation.
Exactly how this is done will be explained in a later section, but essentially the samples of the estimator will be taken over the hemisphere around the point to be shaded, allowing for the estimate of the value of the rendering equation.

# Monte Carlo Path Tracing

Monte Carlo integration is a fundamental component of the *path tracing* algorithm. 
However, the fundamentals of how images can be generated with *rays* must first be explained.

## Ray Casting
Imagine looking out through a window inside a comfy isolated cabin, gazing at an idyllic mountain vista. 
If one were tasked with perfectly replicating this view onto a canvas, how might the problem be optimally approached by an unskilled painter? 
One strategy would be to hang a square-latticed net over the window.
For each square in the net, one simply has to copy the color seen through the square onto corresponding location on the canvas.
The smaller the holes of the net, the more accurate the painting will appear. 

{{< figure src="painter.png" caption="Visualization of how *ray casting* can be used to render an image. The near plane is the image or window that is being looked through, and the far plane would be the limits of the simulation (rays cannot be traced forever). Image credit: [9]" numbered="true" >}}

This is fundamentally how *ray casting* is used to render images: rays are *cast* through each pixel in the image and out into the scene and whatever color is "seen" by that ray is what is used to color the final pixel.
Increasing the resolution of the pixels, thus shooting more rays, produces a more accurate photo.

This algorithm is powerful since it correctly captures *perspective projection* and solves the *hidden surface problem*. 
Perspective projection is responsible for making objects farther away look smaller and closer objects look bigger. 
This is essential in photorealistic rendering because it replicates how humans perceive the world.
The hidden surface problem is the issue of figuring out whether a given point on an object is visible to the camera.
This can be extremely challenging to solve when not using ray casting, since one would have to determine visibility for every point on every object in the scene.
By casting rays from the eye, only surfaces actually visible will ever need to be considered.

## Ray-Scene Intersections
A key component of the ray casting algorithm is determining the closest point of intersection a ray had with the scene. 
With the geometric model of light, a ray is represented with an origin $\boldsymbol{o}$ and a direction $\boldsymbol{d}$.
Given some positive value $t$, one can parameterize the ray to extend it to any given point along the ray [9]:

$$
r(t) = \boldsymbol{o} + \boldsymbol{d}t
$$

Using this parameterization, one can solve for the closest intersection by simply finding the point of intersection with an object in the scene such that the $t$ value is the lowest.

It is trivial to compute this value for any geometric surface which can be described by an explicit function, such as a triangle or a sphere.
In computer graphics, it is most common to represent a scene using triangles, so much research has gone into developing fast and efficient ray-triangle intersection routines. 
One of the most commonly used algorithms is the Möller-Trumbore algorithm [6], which is widely used due to it's speed, efficiency, and simple implementation.

{{< figure src="bvh.png" caption="Diagram of the relationship between a simple scene (a) and it’s BVH representation (b). Figure credit: [9]" numbered="true" >}}

In a ray casting program, the intersection routine will oftentimes still be the most expensive part, since a scene can be comprised of millions of triangles, and each ray needs to test it's intersection against every single triangle. 
One essential optimization which can be done is the use of a spatial acceleration structure such as a *bounding volume hierarchy* (BVH), which allows rays to not have to consider every single triangle while intersection testing.
A BVH constructs a tree of nested bounding boxes around the triangles in the scene.
Then, an intersection test is done by traversing the tree, carrying out an intersection against the box at each node, until it eventually reaches a leaf node containing the actual triangle.
The runtime of the intersection routine goes from being quadratic with respect to the number of triangles to sub-linear.
 Millions of triangles are culled from ever having to be intersected against, which greatly speeds up a ray casting program.

 ## Ray Tracing

The ray casting algorithm discussed thus far does not describe how exactly to choose what color to put for each pixel in the image. 
It only considers where rays intersect in the scene.

In 1980, Arthur Whitted introduced the *ray tracing* algorithm as a means of both rendering the geometry of a scene, but also modelling it's *illumination* [12].
The key insight of this paper was that light could be simulated by tracing it from the camera instead of the light source.
This meant that the ray casting algorithm is used to send out what are known as *view rays*.
Then, for each intersection in the scene by a view ray, a computation of how to shade that point can be done by *shooting more rays*.
One way to do this is by tracing a ray to the light sources in the scene. 
One can determine the amount of light which is being contributed from that light source based on the distance from and angle between the surface and the light source.
Whether the point being shaded is actually visible to the light source can also be determined by shooting additional rays
If the point isn't visible to the light source, then the point is in shadow.

{{< figure src="ray-tracing-image-1.jpg" caption="Diagram of how the ray tracing algorithm is used to shade points. Additional rays can be traced to determine if the point is in shadow (shadow ray is obstructed) and also determine the distance from and angle to the light source to determine light contribution amount. Image credit: [14]" numbered="true" >}}

Another way this technique can be utilized is for rendering mirror-like objects.
When a ray intersects this material, a new ray is traced such that it's direction is a reflection of that incoming ray.
This simulates the behavior of light rays with specular objects.
Furthermore, refraction by glass-like materials can also be simulated in a similar manner by generating a ray based on Snell's law of refraction.
Figure 9 demonstrates this, where the checkerbox plane can be seen in the reflection of the left sphere and refracted through the right sphere.
This also means that complex lighting behavior such as interreflection between multiple mirrored objects can be easily captured by simply tracing a ray many times throughout a scene.

{{< figure src="ray-tracing.png" caption="Rendering from Whitted’s seminal 1980 paper demonstrating the different complex illumination effects which can be captured by the ray tracing algorithm [12]." numbered="true" >}}


The limitation of ray tracing is that it makes no attempt to compute the rendering equation, so it will not capture physically based global illumination behaviors.
Furthermore, the ray tracing process creates a tree of child rays. This exponential branching factor can make it impossible to trace rays any significant depth.

This simple ray tracing algorithm is now referred to as *Whitted-style ray tracing* or *classic ray tracing* [2].
In modern use, the algorithm has since been built upon in order to capture more complex lighting effects.
One possible application of the ray tracing technique is to use it in order to estimate the rendering equation.
By doing this, it is possible to converge to an actual evaluation of the rendering equation (given enough samples).
For every surface intersection, the integral can be estimated by shooting $N$ child rays out into scene, distributed equally over the hemisphere around that point. 
This then forms a Monte Carlo integrator for that integral.
These child rays are shot out into the scene and will recursively evalutate the rendering equation for wherever they intersect in the scene.
The recursion ends either when a specified depth limit has been reached or the ray reaches a light source.
At that point, the emittance term of the equation would be non-zero, and the integral at that point wouldn't have to be evaluated.
This algorithm is known as *Monte Carlo ray tracing*.

## Path Tracing


# References
1. Christensen, P.H. and Jarosz, W. 2016. The path to path-traced movies. Foundations and Trends® in Computer Graphics and Vision 10, 2, 103–175
2. Dutré Philip, Bala, K., and Bekaert, P. 2006. Advanced global illumination. CRC Press. 
3. Fascione, L., Hanika, J., Pieké, R., et al. 2018. Path tracing in production. ACM SIGGRAPH 2018 Courses. 
4. Jensen, H.W. 2010. Realistic image synthesis using photon mapping. Peters, Wellesley, MA. 
5. Kajiya, J.T. 1986. The rendering equation. Proceedings of the 13th annual conference on Computer graphics and interactive techniques  - SIGGRAPH '86. 
6. Möller, T. and Trumbore, B. 1997. Fast, minimum storage ray-triangle intersection. Journal of Graphics Tools 2, 1, 21–28. 
7. Pharr, M. MMP/PBRT-V4: Source code to pbrt, the Ray Tracer described in the forthcoming 4th edition of the "physically based rendering: From theory to implementation" book. GitHub. https://github.com/mmp/pbrt-v4. 
8. Pharr, M. MMP/PBRT-V4-scenes: Example scenes for pbrt-V4. GitHub. https://github.com/mmp/pbrt-v4-scenes. 
9. Pharr, M., Jakob, W., and Humphreys, G. 2017. Physically based rendering from theory to implementation. Morgan Kaufmann Publishers, Amsterdam. 
10. Phong, B.T. 1975. Illumination for computer generated pictures. Communications of the ACM 18, 6, 311–317. 
11. Rendering equation. 2022. Wikipedia. https://en.wikipedia.org/wiki/Rendering_equation. 
12. Whitted, T. 1980. An improved illumination model for shaded display. Communications of the ACM 23, 6, 343–349. 
13. Bikker, J. Probability theory for physically based rendering. Jaccos Blog. https://jacco.ompf2.com/2019/12/11/probability-theory-for-physically-based-rendering/. 
14. Ray Tracing. 2019. NVIDIA Developer. https://developer.nvidia.com/discover/ray-tracing. 
15. Justin Solomon. 2021. Introduction to Computer Graphics (Lecture 16): Global illumination; irradiance/photon maps. YouTube. https://youtu.be/odXCvJTNn6s.
16. Veach, E. and Guibas, L.J. 1995. Optimally combining sampling techniques for Monte Carlo rendering. Proceedings of the 22nd annual conference on Computer graphics and interactive techniques  - SIGGRAPH '95. 
17. Veach, E. and Guibas, L. 1995. Bidirectional estimators for Light Transport. Photorealistic Rendering Techniques, 145–167. 
18. Wald, I., Woop, S., Benthin, C., Johnson, G.S., and Ernst, M. 2014. Embree. ACM Transactions on Graphics 33, 4, 1–8. 
19. Laine, S., Karras, T., and Aila, T. 2013. Megakernels considered harmful. Proceedings of the 5th High-Performance Graphics Conference. 
20. Chaitanya, C.R., Kaplanyan, A.S., Schied, C., et al. 2017. Interactive reconstruction of Monte Carlo image sequences using a recurrent denoising autoencoder. ACM Transactions on Graphics 36, 4, 1–12. 



