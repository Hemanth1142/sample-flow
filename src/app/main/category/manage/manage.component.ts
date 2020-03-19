import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CategoryService } from '../category.service';
import { CoreService } from 'app/core/core.service';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.scss']
})
export class ManageComponent implements OnInit {
  categoryForm: FormGroup;
  status: any[];
  isEdit: boolean;
  categoryDetail: any;
  formData: FormData = new FormData();
  selectedImage: File;
  imageUrl: any;
  isSubmited: boolean;
  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private categoryService: CategoryService,
    private coreService: CoreService
  ) {}

  ngOnInit(): void {
    this.isEdit = false;
    this.selectedImage = null;
    this.imageUrl = null;
    this.isSubmited = false;
    this.categoryDetail = {};
    this.categoryForm = this.fb.group({
      category: ['', Validators.required],
      isActive: [true, Validators.required]
    });
    this.route.data.subscribe(
      (data: any) => {
        if (data && data.detail) {
          this.categoryDetail = data.detail;
          this.categoryForm.patchValue(this.categoryDetail);
          this.isEdit = true;
        }
      },
      (err: any) => {
        this.coreService.showSnackbar('Something went wrong', '', 'fail');
        this.coreService.navigateTo('category');
      }
    );
  }

  onSubmit(e: any): void {
    if (this.categoryForm.valid && (this.isEdit ? true : this.selectedImage)) {
      if (this.selectedImage && this.imageUrl) {
        this.formData.append(
          'image',
          this.selectedImage,
          this.selectedImage.name
        );
      } else {
        this.formData.append('imageName', this.categoryDetail.imageName);
      }
      this.formData.append('category', this.categoryForm.value.category);
      this.formData.append('isActive', this.categoryForm.value.isActive);

      if (!this.isEdit) {
        this.categoryService.createCategory(this.formData).subscribe(
          (res: any) => {
            if (res && res.status) {
              res.message = 'Category created successfully.';
              this.coreService.showSnackbar(res.message);
              this.coreService.navigateTo('/category');
            } else {
              this.coreService.showSnackbar(res.message, '', 'fail');
            }
          },
          (error: any) => {
            this.coreService.showSnackbar(error.error.message, '', 'fail');
          }
        );
      } else {
        this.formData.append('categoryId', this.categoryDetail.categoryId);
        this.categoryService.updateCategory(this.formData).subscribe(
          (res: any) => {
            if (res && res.status) {
              res.message = 'Category updated successfully.';
              this.coreService.showSnackbar(res.message);
              this.coreService.navigateTo('/category');
            } else {
              this.coreService.showSnackbar(res.message, '', 'fail');
            }
          },
          (error: any) => {
            this.coreService.showSnackbar(error.error.message, '', 'fail');
          }
        );
      }
    } else {
      this.isSubmited = true;
    }
  }

  clearImage(): void {
    this.selectedImage = null;
    this.imageUrl = null;
  }

  openImageSelector(imageInput): void {
    imageInput.click();
  }

  fileChange(event): void {
    if (event.target.files && event.target.files[0]) {
      const files = event.target.files;
      if (
        !this.coreService.checkFiles(files, 1024 * (5 * 1024), {
          image: true,
          pdf: false
        })
      ) {
        this.selectedImage = event.target.files[0];
        const reader = new FileReader();
        reader.onload = e => (this.imageUrl = reader.result);
        reader.readAsDataURL(this.selectedImage);
      } else {
        event.target.value = null;
      }
    }
  }
}
